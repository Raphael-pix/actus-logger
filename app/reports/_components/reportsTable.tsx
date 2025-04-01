import { reportColumns } from "@/components/ui/columns";
import { ReportsDataTable } from "@/components/ui/reports-table";
import { getReports } from "@/lib/services";

export default async function ReportsTable() {
  const data = await getReports();

  return (
    <div className="container mx-auto">
      <ReportsDataTable columns={reportColumns} data={data} />
    </div>
  );
}
