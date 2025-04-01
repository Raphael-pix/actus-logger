import React from "react";
import ReportsTable from "./_components/reportsTable";

export default function DashboardPage() {
  return (
    <div className="p-2 space-y-6 lg:p-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-bold text-neutral-black lg:text-2xl">
          Reports
        </h1>
      </div>
      <ReportsTable />
    </div>
  );
}
