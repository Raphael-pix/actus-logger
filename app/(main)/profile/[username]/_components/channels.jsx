import React, { useState } from "react";

const ChannelsTab = () => {
  const [sites, setSites] = useState([]);
  const getStatusClass = (status) => {
    switch (status) {
      case "active":
      case "completed":
        return "bg-green-100 text-green-800";
      case "inactive":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-background shadow rounded-lg overflow-hidden">
      <div className="p-6 border-b border-input">
        <h2 className="text-lg font-medium">Your Channels</h2>
        <p className="text-sm text-secondary-foreground">Locations you have access to</p>
      </div>
      {
        sites.length === 0 && (
          <div className="py-12 text-center font-semibold text-xl">
            No sites assigned
          </div>
        )
      }
      <ul className="divide-y divide-input">
        {sites.map((site) => (
          <li
            key={site.id}
            className="p-6 flex items-center justify-between"
          >
            <div>
              <h3 className="text-sm font-medium">
                {site.name}
              </h3>
              <p className="text-sm text-gray-500">No. of channels: {site.count}</p>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                site.status
              )}`}
            >
              {site.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsTab;
