"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminUserChatList } from "src/api/conversation";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getAdminUserChatList();
    if (res.success) setUsers(res.data);
  };

  const openChat = (userId: string) => {
    router.push(`/chats?asUser=${userId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Users List</h1>

      <div className="space-y-3">
        {users?.map((user: any) => (
          <div
            key={user.userId}
            onClick={() => openChat(user.chatUserId)}
            className="flex justify-between items-center p-4 border border-gray-700 rounded cursor-pointer hover:bg-gray-400/20"
          >
            <div>
              <p className="font-medium">{user.displayName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>

            <span className="text-xs px-2 py-1 yellow-bg text-black rounded">
              Open Chat
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
