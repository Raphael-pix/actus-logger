import React, { useState } from "react";

const ReportsTab = () => {
  const [reports, setReports] = useState([]);
  // Status badge styling
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
        <h2 className="text-lg font-medium">Your Reports</h2>
        <p className="text-sm text-accent-foreground">
          Reports you have created
        </p>
      </div>
      {
        reports.length === 0 && (
          <div className="py-12 text-center font-semibold text-xl">
            No reports created
          </div>
        )
      }
      <ul className="divide-y divide-input">
        {reports.map((report) => (
          <li key={report.id} className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">{report.title}</h3>
              <p className="text-sm text-accent-foreground">
                Created: {report.date}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-4 ${getStatusClass(
                  report.status
                )}`}
              >
                {report.status}
              </span>
              <button className="text-primary hover:text-primary">View</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsTab;
