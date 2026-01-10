
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
  const hasUnread = unseenMessageNo > 0;

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3  cursor-pointer transition-all duration-200 rounded-2xl ${hasUnread
          ? "gray-bg  hover:bg-gray-400/20"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
        } shadow-sm border border-b  border-gray-400/20 dark:border-gray-700`}
    >

      <div className="flex items-center gap-3">
        <div className="relative w-[48px] h-[48px]">
        
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover rounded-full border border-gray-400/20"

          />
          {hasUnread && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* Middle: Name + Message */}
        <div className="flex flex-col">
          <span
            className={`font-semibold text-sm md:text-base ${hasUnread ? "text-gray-900 dark:text-white" : "text-gray-700"
              }`}
          >
            {name}
          </span>
          <span className="text-xs md:text-sm text-gray-500 truncate w-[150px] md:w-[120px]">
            {lastMessage || "No messages yet"}
          </span>
        </div>
      </div>

      {/* Right: Time + Unread Count */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-gray-400">
          {formatDate(lastMessageTime)}
        </span>
        {hasUnread && (
          <span className="bg-amber-400 text-white text-xs font-semibold rounded-full px-2 py-0.5 shadow-sm">
            {unseenMessageNo}
          </span>
        )}
      </div>
    </div>
  );
}
