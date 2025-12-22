"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "src/utils/providers/AuthProvider";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import InboxTab from "../../components/ChatComps/InboxTab";
import MessageContainer from "../../components/ChatComps/MessageContainer";
import { getConversationsByUser } from "src/api/conversation";
import { toast } from "react-toastify";

export const socket = io("http://localhost:5005", { autoConnect: false });

export default function Chat() {
  const [conversationData, setConversationData] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const searchParams = useSearchParams();
  const preselected = searchParams.get("q");
  const userInfo = useAuth();

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
    if (!userInfo?.id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", userInfo.id);

    if (preselected) setReceiverId(preselected);

    fetchConversations(userInfo.id);
  }, [userInfo?.id]);

  useEffect(() => {
    if (!userInfo?.id) return;

    // Any new message
    socket.on("receiveMessage", ({ conversationId }) => {
      fetchConversations(userInfo.id);

      // If user is viewing this chat, force MessageContainer to refresh messages
      if (conversationId === receiverId) {
        socket.emit("refreshMessages", { conversationId });
      }
    });

    // Messages read
    socket.on("messagesMarkedRead", () => {
      fetchConversations(userInfo.id);
    });

    socket.on("conversationUpdated", () => {
      fetchConversations(userInfo.id);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messagesMarkedRead");
      socket.off("conversationUpdated");
    };
  }, [receiverId, userInfo?.id]);

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
    socket.emit("sendMessage", { text: message, senderId, receiverId });
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
      {/* SIDEBAR */}
      <div className="w-full md:w-[340px] border-r border-gray-400/20 gray-bg rounded-2xl">
        {/* TABS */}
        <div className="flex border-b border-gray-700">
          <button
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
        {receiverId ? (
          <MessageContainer
            sendMessage={sendMessage}
            senderId={userInfo?.id}
            receiverId={receiverId}
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
