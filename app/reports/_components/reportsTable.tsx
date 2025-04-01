import { reportColumns, Report } from "@/components/ui/columns";
import { ReportsDataTable } from "@/components/ui/reports-table";

async function getData(): Promise<Report[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Report on Channel clarity in ACTMombasa 0n 23/02/25",
      createdBy: "Raphael",
      date: new Date("2025-03-21").toLocaleDateString(),
      type: "exel",
    },
    {
      id: "489e1d42",
      name: "Report on Channel clarity in ACTNairobi 0n 23/02/25",
      createdBy: "Daniel",
      date: new Date("2025-03-21").toLocaleDateString(),
      type: "exel",
    },
    {
      id: "881f1d52",
      name: "Report on Channel clarity in CACenter01 0n 23/02/25",
      createdBy: "Daniel",
      date: new Date("2025-03-21").toLocaleDateString(),
      type: "exel",
    },
    {
      id: "175et7d2",
      name: "Report on Channel clarity in CACenter02 0n 23/02/25",
      createdBy: "Daniel",
      date: new Date("2025-03-21").toLocaleDateString(),
      type: "exel",
    },
    {
      id: "4247u6f2",
      name: "Report on Channel clarity in ACTKahawa 0n 23/02/25",
      createdBy: "Shadaai",
      date: new Date("2025-03-21").toLocaleDateString(),
      type: "pdf",
    },
    {
      id: "359v8n82",
      name: "Report on Channel clarity in ACTMuranga 0n 23/02/25",
      createdBy: "Shadaai",
      date: new Date("2025-03-21").toLocaleDateString(),
      type: "pdf",
    },
    {
      id: "962v2s43",
      name: "Report on Channel clarity in ACTNyeri 0n 23/02/25",
      createdBy: "Raphael",
      date: new Date("2025-03-21").toLocaleDateString(),
      type: "exel",
    },
  ];
}

export default async function ReportsTable() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <ReportsDataTable columns={reportColumns} data={data} />
    </div>
  );
}
