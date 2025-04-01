import StatCards from "./_components/statCards";
import ChannelCharts from "./_components/channelCharts";
import SiteGraph from "./_components/siteGraph";
import ReportsTable from "./_components/reportsTable";

export default function DashboardPage() {
  return (
    <div className="p-2 space-y-6 lg:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-bold lg:text-2xl">
          Dashboard Overview
        </h1>
      </div>
      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChannelCharts />
        <SiteGraph />
      </div>
      <ReportsTable />
    </div>
  );
}
