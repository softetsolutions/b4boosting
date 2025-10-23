"use client";

import { useEffect, useState } from "react";
import { getAllMessagesBetweenTwoUsers } from "src/api/conversation";

export default function MessageContainer({
  sendMessage,
  senderId,
  receiverId,
}) {
  const [message, setMessage] = useState("");
  const [messageList, setMessagelist] = useState([]);

  const handleMessageOnChnage = (event) => {
    setMessage(event.target.value);
  };

  async function getAllMessages(senderId, receiverId) {
    try {
      const res = await getAllMessagesBetweenTwoUsers(senderId, receiverId);
      setMessagelist(res.data.messages);
      console.log("response between between two users", res.data.messages);
    } catch (error) {
      toast.error(`Got ${error}`);
      console.error("geting error", error);
    }
  }

  useEffect(() => {
    getAllMessages(senderId, receiverId);
  }, []);

  return (
    <div>
      <div className="h-[10vh]">This is header</div>
      <div className="h-[70vh]">
        {messageList?.length ? (
          messageList?.map((value, index) => (
            <div key={index}>{value.text}</div>
          ))
        ) : (
          <div>No message history yet</div>
        )}
      </div>
      <div className="h-[20vh] flex">
        <input
          type="text"
          placeholder="Enter the message"
          onChange={handleMessageOnChnage}
        />
        <button
          className="w-2xs h-5 bg-amber-100 text-black"
          type="button"
          placeholder="Submit"
          onClick={() => sendMessage(message, senderId, receiverId)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
