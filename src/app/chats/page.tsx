"use client";
import { useEffect, useState } from "react";
import { useAuth } from "src/utils/providers/AuthProvider";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import InboxTab from "../../components/ChatComps/InboxTab";
import MessageContainer from "../../components/ChatComps/MessageContainer";
import { getAllConversations } from "src/api/conversation";
import { toast } from "react-toastify";

///api/conversations/user/{userId}
const socket = io("http://localhost:5005", { autoConnect: false });

export default function Chat() {
  const [conversationData, setConversationData] = useState([]);
  const [reciverId, setReceiverId] = useState("");

  let searchParams = useSearchParams();
  const iD = searchParams.get("q");
  const userInfo = useAuth();

  async function getAllConversationData(userId: string) {
    try {
      const res = await getAllConversations(userId);
      setConversationData(res.data);
    } catch (error) {
      toast.error(`Got ${error}`);
      console.error("geting error", error);
    }
  }

  console.log("conversationData is", conversationData, userInfo?.id);

  useEffect(() => {
    socket.connect();
    socket.emit("join", userInfo?.id);
    iD && setReceiverId(iD);
    getAllConversationData(userInfo?.id);

    socket.on("receiveMessage", (data) => {
      console.log("message is", data);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, []);

  const sendMessage = (
    message: string,
    senderId: string,
    receiverId: string
  ) => {
    console.log("dendMessage function is running");
    socket.emit("sendMessage", {
      senderId: senderId,
      receiverId: receiverId,
      text: message,
    });
  };

  return (
    <div className="flex flex-col md:flex-row px-12 py-5 bg-black h-screen gap-4" >
      <div className="w-full md:w-[340px]  border-r border-r-solid border-r-gray-400/20 shrink-0 gray-bg rounded-2xl">
       
        <div className="flex flex-col gap-2 p-2">
          {conversationData.length ? (
            conversationData.map((value: any, index: number) => (
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
            <div>No chats Found</div>
          )}
        </div>
      </div>
      <div className="flex-1 gray-bg rounded-2xl rounded-br-2xl">
        {reciverId ? (
          <MessageContainer
            sendMessage={sendMessage}
            senderId={userInfo?.id}
            receiverId={reciverId}
          />
        ) : (
          <div>PLs select an chat</div>
        )}
      </div>
    </div>
  );
}
