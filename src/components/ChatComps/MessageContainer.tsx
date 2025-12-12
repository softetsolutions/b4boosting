"use client";

import { useEffect, useState } from "react";
import { getConversationBetween } from "src/api/conversation";
import { toast } from "react-hot-toast";
import { socket } from "../../app/chats/page";

export default function MessageContainer({
  sendMessage,
  senderId,
  receiverId,
}: {
  sendMessage: (message: string, senderId: string, receiverId: string) => void;
  senderId: string;
  receiverId: string;
}) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  // ──────────────────────────────
  // Fetch messages
  // ──────────────────────────────
  async function loadMessages() {
    try {
      if (!senderId || !receiverId) return;

      const res = await getConversationBetween(senderId, receiverId);
      if (!res.success || !res.data) return;

      const conv = res.data;
      setMessageList(conv.messages || []);

      socket.emit("markRead", { conversationId: conv._id });
    } catch (error) {
      toast.error("Failed to load messages");
      console.error(error);
    }
  }

  useEffect(() => {
    loadMessages();
  }, [senderId, receiverId]);

  // ──────────────────────────────
  // Real-time updates
  // ──────────────────────────────
  useEffect(() => {
    const handleReceive = ({ conversationId, message }: any) => {
      setMessageList((prev) => [...prev, message]);
    };

    const handleRefresh = () => {
      loadMessages();
    };

    socket.on("receiveMessage", handleReceive);
    socket.on("refreshMessages", handleRefresh);

    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("refreshMessages", handleRefresh);
    };
  }, [senderId, receiverId]);

  // ──────────────────────────────
  // Send message handler
  // ──────────────────────────────
  const handleSend = () => {
    if (!message.trim()) return;
    console.log("message is", message, senderId,"senderId", receiverId, "receiverId", socket, socket.id);
    sendMessage(message, senderId, receiverId);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-700 gray-bg rounded-2xl">
        <div className="flex items-center gap-3">
          <img
            src="https://www.g2g.com/static/images/avatar-default.svg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-600"
          />
          <div>
            <h2 className="text-lg font-semibold">Chat</h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">Secure Chat</div>
      </header>

      {/* MESSAGES */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 bg-[#111111]">
        {messageList.length ? (
          messageList.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
                  msg.sender === senderId
                    ? "bg-amber-400 text-black rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No message history yet
          </div>
        )}
      </main>

      {/* INPUT */}
      <footer className="border-t border-gray-700 gray-bg px-4 py-3 flex items-center gap-3 rounded-2xl">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-black-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          onClick={handleSend}
          className="bg-amber-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-amber-300 transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
