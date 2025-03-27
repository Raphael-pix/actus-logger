import React from "react";
import { BarChart3 } from "lucide-react";

const RecentActivity = ({ recentActivity}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-h-[42vh] overflow-y-auto hidden-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Recent Activity</h2>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>
      {recentActivity.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center text-center">
          <p className="text-neutral-grey capitalize">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="p-2 rounded-lg bg-gray-100">
                <activity.icon className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium">{activity.title}</h3>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
