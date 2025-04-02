import { reportColumns } from "@/components/ui/columns";
import { ReportsDataTable } from "@/components/ui/reports-table";
import { getReports } from "@/lib/services";
import { cookies } from "next/headers";


export default async function ReportsTable() {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;
  const data = await getReports(token);

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Reports</h2>
      </div>
      <ReportsDataTable columns={reportColumns} data={data} />
    </div>
  );
}
