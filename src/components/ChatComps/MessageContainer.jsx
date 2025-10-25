"use client";

import { useEffect, useState } from "react";
import { getAllMessagesBetweenTwoUsers } from "src/api/conversation";
import { toast } from "react-hot-toast";

export default function MessageContainer({ sendMessage, senderId, receiverId }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleMessageChange = (e) => setMessage(e.target.value);

  async function getAllMessages(senderId, receiverId) {
    try {
      const res = await getAllMessagesBetweenTwoUsers(senderId, receiverId);
      setMessageList(res.data.messages);
      console.log("Messages fetched:", res.data.messages);
    } catch (error) {
      toast.error("Failed to load messages");
      console.error(error);
    }
  }

  useEffect(() => {
    if (senderId && receiverId) getAllMessages(senderId, receiverId);
  }, [senderId, receiverId]);

  return (
    <>
  
     <div className="flex flex-col h-full text-white">
      {/* Header */}
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

      {/* Chat Body */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 bg-[#111111]">
        {messageList?.length ? (
          messageList.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
                  msg.senderId === senderId
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

      {/* Message Input */}
      <footer className="border-t border-gray-700 gray-bg px-4 py-3 flex items-center gap-3 rounded-2xl">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-black-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          onClick={() => {
            if (!message.trim()) return;
            sendMessage(message, senderId, receiverId);
            setMessage("");
          }}
          className="bg-amber-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-amber-300 transition"
        >
          Send
        </button>
      </footer>
    </div>
    </>
   
  );
}
