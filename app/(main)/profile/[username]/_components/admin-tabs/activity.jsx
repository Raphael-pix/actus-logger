import { Activity } from "lucide-react";
import React from "react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
    lastActive: "2025-04-08",
    channels: ["News", "Sports"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "2025-04-09",
    channels: ["Technology", "Business"],
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "User",
    status: "Inactive",
    lastActive: "2025-04-01",
    channels: ["Entertainment"],
  },
];

const ActivityTab = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Activity className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">
          Recent User Activity
        </h2>
      </div>
      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-sm font-medium text-gray-900">
              {user.name} - {user.status}
            </p>
            <p className="text-sm text-gray-500">
              Last active: {user.lastActive}
            </p>
            <p className="text-sm text-gray-500">
              Using channels: {user.channels.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTab;
