
import StatCards from "./_components/statCards"
import QuickActions from "./_components/quickActions";
import RecentActivity from "./_components/recentActivity";

export default function DashboardPage() { 
  return (
    <div className="p-2 space-y-6 lg:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-bold text-neutral-black lg:text-2xl">Dashboard Overview</h1>
      </div>
      <StatCards/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity recentActivity={[]}/>
        <QuickActions />
      </div>
    </div>
  );
}
