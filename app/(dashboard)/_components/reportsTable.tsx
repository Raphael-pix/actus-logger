import { reportColumns } from "@/components/ui/columns";
import { ReportsDataTable } from "@/components/ui/reports-table";
import { getReports } from "@/lib/services";


export default async function ReportsTable() {
  const data = await getReports();

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Reports</h2>
      </div>
      <ReportsDataTable columns={reportColumns} data={data} />
    </div>
  );
}
