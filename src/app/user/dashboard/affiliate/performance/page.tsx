// "use client";

// export default function PerformancePage() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-white mb-6">
//         Performance Overview
//       </h1>
//       <p className="text-gray-400">
//         Here you’ll see your referral clicks, signups, and earnings.
//       </p>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

interface AuthTokenPayload {
  id: string;
  username: string;
  affiliateId?: string;
}

interface StatsData {
  affiliateId: string;
  name: string;
  clicks: number;
  registrations: number;
  conversionRate: number;
  users: Array<{ _id: string; username: string; email: string; displayName: string }>;
}

export default function PerformancePage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getCookie("token");
        if (!token) return;

        const decoded = jwtDecode<AuthTokenPayload>(token);
        if (!decoded.affiliateId) {
          toast.error("You are not an affiliate.");
          return;
        }

        const username = decoded.username; // e.g., "AFF123"
        const res = await fetch(`http://localhost:5005/api/affiliate/AFF${username}/stats`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch performance stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="p-8 text-gray-400">Loading stats...</p>;
  }

  if (!stats) {
    return <p className="p-8 text-red-400">No stats available.</p>;
  }

  return (
    <div className="p-8">
       <h1 className="text-2xl font-bold text-white mb-12">{stats.name} - Performance</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-lg font-semibold">Clicks</h2>
          <p className="text-3xl font-bold mt-2">{stats.clicks}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-lg font-semibold">Registrations</h2>
          <p className="text-3xl font-bold mt-2">{stats.registrations}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-lg font-semibold">Conversion Rate</h2>
          <p className="text-3xl font-bold mt-2">{stats.conversionRate?.toFixed(2)}%</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.users?.length}</p>
        </div>
      </div>

      {/* Optional: List of referred users */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Referred Users</h2>
        <div className="overflow-auto max-h-80">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Display Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {stats.users?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-800">
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.displayName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
