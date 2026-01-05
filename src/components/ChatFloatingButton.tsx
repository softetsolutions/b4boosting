"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleQuestion } from "lucide-react";

export default function ChatFloatingButton({ dynamicdata }: any) {
  const router = useRouter();
  const [hasActiveChat, setHasActiveChat] = useState(false);

  useEffect(() => {
    // Check active chat from homepage data or API
    // if (dynamicdata?.activeChat === true) {
      setHasActiveChat(true);
    // }
  }, [dynamicdata]);

  if (!hasActiveChat) return null;

  return (
    <div
      onClick={() => router.push("/chats")}
      className="fixed bottom-8 right-8 bg-[#FFD700] hover:bg-[#ffce39] text-black shadow-xl cursor-pointer 
                 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 z-[9999]"
    >
      <MessageCircleQuestion className="w-7 h-7" />
    
    </div>
  );
}
