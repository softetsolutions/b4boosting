"use client";
import { formatDate } from "src/utils/clientHelperFunctions";

export default function InboxTab({
  imgSrc,
  name,
  lastMessage,
  lastMessageTime,
  unseenMessageNo,
  onClick,
}) {
  return (
    <div className=" flex" onClick={onClick}>
      <div className="w-[40px] h-[40px] rounded-full">
        <img src={imgSrc} />
      </div>
      <div>
        <div className="">{name}</div>
        <div className="">{lastMessage}</div>
      </div>
      <div>
        <div>{formatDate(lastMessageTime)}</div>
        <div>{unseenMessageNo}</div>
      </div>
    </div>
  );
}
