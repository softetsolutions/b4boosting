"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "src/utils/providers/AuthProvider";
import { useSearchParams } from "next/navigation";
import InboxTab from "../../components/ChatComps/InboxTab";
import MessageContainer from "../../components/ChatComps/MessageContainer";
import { getConversationsByUser } from "src/api/conversation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { socket } from "src/utils/socket";

interface ConversationItem {
  conversationId: string;
  chatType: 0 | 1;
  userId: string;
  displayName: string;
  lastMessage: string;
  timestamp?: string;
  orderStatus?: string | null;
  unreadCount?: number;
}


export default function Chat() {
  const [conversationData, setConversationData] = useState<ConversationItem[]>([]);
  const [receiverId, setReceiverId] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const searchParams = useSearchParams();
  const preselected = searchParams.get("q");
  const userInfo = useAuth();
const router = useRouter();

  console.log("userInfo", userInfo);

  const asUser = searchParams.get("asUser");
const isAdmin = userInfo?.role === "admin"; 

 const chatOwnerId = isAdmin && asUser ? asUser : userInfo?.id;
  async function fetchConversations(userId: string) {
    try {
      const res = await getConversationsByUser(userId);
      setConversationData(res?.data);
    } catch (err) {
      toast.error("Failed to load conversations");
      console.error(err);
    }
  }

  useEffect(() => {
    if (!chatOwnerId) return;

    if (!socket.connected) {
      socket.connect();
    }

   socket.emit("join", chatOwnerId);

    if (preselected) setReceiverId(preselected);

    fetchConversations(chatOwnerId);
  }, [chatOwnerId, preselected]);

  useEffect(() => {
     if (!chatOwnerId) return;

    // Any new message
    socket.on("receiveMessage", ({ conversationId }) => {
      fetchConversations(chatOwnerId);

      // If user is viewing this chat, force MessageContainer to refresh messages
      if (conversationId === receiverId) {
        socket.emit("refreshMessages", { conversationId });
      }
    });

    // Messages read
    socket.on("messagesMarkedRead", () => {
      fetchConversations(chatOwnerId);
    });

    socket.on("conversationUpdated", () => {
      fetchConversations(chatOwnerId);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messagesMarkedRead");
      socket.off("conversationUpdated");
    };
  }, [receiverId, chatOwnerId]);

  const sendMessage = (
    message: string,
    senderId: string,
    receiverId: string
  ) => {
    console.log(
      "sendMessage function is running",
      senderId,
      receiverId,
      message
    );
    socket.emit("sendMessage", { text: message, senderId: chatOwnerId, receiverId });
  };

  const activeChats = useMemo(
    () => conversationData?.filter((c) => c.chatType === 1),
    [conversationData]
  );

  const generalChats = useMemo(
    () => conversationData?.filter((c) => c.chatType === 0),
    [conversationData]
  );

  useEffect(() => {
    if (!receiverId) return;

    const selected = conversationData?.find((c) => c.userId === receiverId);
    if (!selected) return;

    setActiveTab(selected.chatType === 1 ? "active" : "general");
  }, [receiverId, conversationData]);

  const filteredChats = activeTab === "active" ? activeChats : generalChats;

  useEffect(() => {
    if (preselected && conversationData?.length > 0) {
      const exists = conversationData.some((c) => c.userId === preselected);
      if (!exists) setReceiverId(preselected);
    }
  }, [conversationData, preselected]);

  return (
    <div className="flex flex-col md:flex-row px-12 py-5 bg-black h-screen gap-4">

      <button
  type="button"
  onClick={() => router.back()} // ✅ goes to previous page
  className="absolute top-4 right-6 text-gray-400 hover:text-white text-2xl font-semibold z-50"
  aria-label="Close chat"
>
  ×
</button>
      {/* SIDEBAR */}
      <div className="w-full md:w-[340px] border-r border-gray-400/20 gray-bg rounded-2xl">
        {/* TABS */}
        <div className="flex border-b border-gray-700">
          <button
            aria-label="active orders"
            type="button"
            onClick={() => setActiveTab("active")}
            className={`px-4 py-3 flex-1 text-center ${
              activeTab === "active"
                ? "border-b-2 border-yellow-500 font-semibold"
                : "text-gray-400"
            }`}
          >
            Active Orders
          </button>

          <button
            aria-label="general"
            type="button"
            onClick={() => setActiveTab("general")}
            className={`px-4 py-3 flex-1 text-center ${
              activeTab === "general"
                ? "border-b-2 border-yellow-500 font-semibold"
                : "text-gray-400"
            }`}
          >
            General
          </button>
        </div>

        {/* CHAT LIST */}
        <div className="flex flex-col gap-2 p-2 overflow-y-auto h-[calc(100%-48px)]">
          {filteredChats?.length ? (
            filteredChats?.map((value, index) => (
              <InboxTab
                key={index}
                imgSrc={null}
                name={value.displayName}
                lastMessage={value.lastMessage}
                lastMessageTime={value.timestamp}
                unseenMessageNo={value.unreadCount}
                onClick={() => setReceiverId(value.userId)}
              />
            ))
          ) : (
            <div className="text-gray-500 text-sm p-3 text-center">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="flex-1 gray-bg rounded-2xl">
        {receiverId && chatOwnerId ? (
          <MessageContainer
            sendMessage={sendMessage}
            senderId={chatOwnerId}
            receiverId={receiverId}
            isAdmin={isAdmin}
          />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
