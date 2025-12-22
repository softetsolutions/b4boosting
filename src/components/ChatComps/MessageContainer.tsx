"use client";

import { useEffect, useState } from "react";
import { getConversationBetween, uploadChatFile } from "src/api/conversation";
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
  const [receiverName, setReceiverName] = useState<string>(""); // 🔥 NEW
  const [conversationsId, setConversationsId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  async function loadMessages() {
    try {
      if (!senderId || !receiverId) return;

      const res = await getConversationBetween(senderId, receiverId);
      if (!res.success || !res.data) return;

      const conv = res.data;
      console.log(conv, "conv");
      setConversationsId(conv._id);
      setMessageList(conv.messages || []);
      const otherUser = conv.participantsInfo?.find(
        (u: any) => u._id === receiverId
      );

      if (otherUser) {
        setReceiverName(otherUser.username || otherUser.name);
      }
      socket.emit("markAsRead", {
        conversationId: conv._id,
        userId: senderId,
      });
    } catch (error) {
      toast.error("Failed to load messages");
      console.error(error);
    }
  }

  useEffect(() => {
    loadMessages();
  }, [senderId, receiverId]);

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

  const handleSend = () => {
    if (!message.trim()) return;
    console.log(
      "message is",
      message,
      senderId,
      "senderId",
      receiverId,
      "receiverId",
      socket,
      socket.id
    );
    sendMessage(message, senderId, receiverId);
    setMessage("");
  };

  const handleOrderAction = (btn: any, msg: any) => {
    if (!socket || !socket.connected) {
      console.error("❌ Socket not connected");
      toast.error("Connection issue. Please refresh.");
      return;
    }
    if (!conversationsId) {
      toast.error("Conversation not ready");
      return;
    }

    console.log("📤 Emitting orderAction", {
      action: btn.action,
      orderId: btn.payload.orderId,
      actorId: senderId,
      conversationsId,
    });

    socket.emit("orderAction", {
      action: btn.action, // ACCEPT_ORDER / DECLINE_ORDER
      orderId: btn.payload.orderId,
      actorId: senderId,
      conversationId: conversationsId,
    });
  };

  const handleDeliverOrder = async (btn: any, msg: any) => {
  console.log("btn", btn, "btn.payload", btn.payload, "msg", msg);

   if (!btn.payload.orderId) {
    toast.error("Order ID missing");
    return;
  }

  if (!selectedFile) {
    toast.error("Please attach a file");
    return;
  }

  if (!conversationsId) {
    toast.error("Conversation not ready yet");
    return;
  }

  try {
    setUploading(true);

    const uploadRes = await uploadChatFile(selectedFile);

    const filePayload = {
      url: uploadRes.fileUrl,
      name: uploadRes.fileName,
      mimeType: uploadRes.mimeType,
      size: uploadRes.size,
    };

    console.log("📤 Emitting DELIVER_ORDER", {
      action: "DELIVER_ORDER",
      // orderId: msg.orderId,
      orderId: btn.payload.orderId,
      actorId: senderId,
      conversationId: conversationsId,
      file: filePayload,
    });

    socket.emit("orderAction", {
      action: "DELIVER_ORDER",
      // orderId: msg.orderId,
      orderId: btn.payload.orderId,
      actorId: senderId,
      conversationId: conversationsId,
      file: filePayload,
    });

    setSelectedFile(null);
    toast.success("File delivered successfully");
  } catch (err) {
    console.error(err);
    toast.error("File upload failed");
  } finally {
    setUploading(false);
  }
};

  const handleCompleteOrder = (btn: any, msg: any) => {
    socket.emit("orderAction", {
      action: "COMPLETE_ORDER",
      // orderId: msg.orderId,
      orderId: btn.payload.orderId,
      actorId: senderId,
      conversationId: conversationsId,
    });
  };

  useEffect(() => {
    socket.on("orderStatusUpdated", ({ conversationId }) => {
      if (conversationId === conversationsId) {
        loadMessages();
      }
    });

    socket.on("orderActionError", ({ message }) => {
      toast.error(message);
    });

    return () => {
      socket.off("orderStatusUpdated");
      socket.off("orderActionError");
    };
  }, [conversationsId]);

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
            {/* <h2 className="text-lg font-semibold">{receiverId}</h2> */}
            <h2 className="text-lg font-semibold">
              {receiverName || "User"} {/* 🔥 SHOW NAME INSTEAD OF ID */}
            </h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">Secure Chat</div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 bg-[#111111]">
        {messageList
          ?.filter((msg) => {
            if (!msg.visibleTo || msg.visibleTo.length === 0) return true;
            return msg.visibleTo.includes(senderId);
          })
          .map((msg, index) => {
            const isMine = msg.sender === senderId;

            return (
              <div
                key={index}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm space-y-2 ${
                    msg.senderRole === "system"
                      ? "bg-blue-900 text-blue-100"
                      : isMine
                      ? "bg-amber-400 text-black rounded-br-none"
                      : "bg-gray-700 text-gray-100 rounded-bl-none"
                  }`}
                >
                  {/* MESSAGE TEXT */}
                  <p className="whitespace-pre-line">{msg.text}</p>

              
                  {/* FILE DOWNLOAD */}
                  {msg.file && (
  <a href={msg.file.url} download>
    Download {msg.file.name}
  </a>
)}


                  {/* FILE INPUT (Seller Deliver) */}
                  {msg.type === "action" &&
                    msg.actions?.map((btn: any, i: number) => {
                      const canClick =
                        btn.allowedUsers?.includes(senderId) && !btn.disabled;

                      if (!canClick) return null;

                      if (btn.action === "DELIVER_ORDER") {
                        return (
                          <div key={i} className="space-y-2">
                            <input
                              type="file"
                              onChange={(e) =>
                                setSelectedFile(e.target.files?.[0] || null)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => handleDeliverOrder(btn, msg)}
                              disabled={uploading}
                              className="w-full bg-green-500 text-white py-1 rounded"
                            >
                              {uploading ? "Uploading..." : "Deliver Order"}
                            </button>
                          </div>
                        );
                      }

                      if (btn.action === "COMPLETE_ORDER") {
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => handleCompleteOrder(btn, msg)}
                            className="w-full bg-blue-500 text-white py-1 rounded"
                          >
                            I have received the product
                          </button>
                        );
                      }

                      return (
                        <button
                          type="button"
                          key={i}
                          onClick={() => handleOrderAction(btn, msg)}
                          className="w-full bg-green-500 text-white py-1 rounded"
                          disabled={btn.disabled}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })}
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
          type="button"
          onClick={handleSend}
          className="bg-amber-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-amber-300 transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
