import { reportColumns } from "@/components/ui/columns";
import { ReportsDataTable } from "@/components/ui/reports-table";
import { getReports } from "@/lib/services";
import { cookies } from "next/headers";

export default async function ReportsTable() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const data = await getReports(token);

  return (
    <div className="container mx-auto">
      <ReportsDataTable columns={reportColumns} data={data} />
    </div>
  );
}
