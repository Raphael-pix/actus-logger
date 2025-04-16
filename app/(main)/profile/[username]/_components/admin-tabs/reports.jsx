import { reportColumns } from "@/components/ui/columns";
import { ReportsDataTable } from "@/components/ui/reports-table";
import { AlertCircle } from "lucide-react";
import React from "react";

const ReportsTab = ({reports}) => {
  return (
    <ReportsDataTable columns={reportColumns} data={reports}/>
  );
};

export default ReportsTab;
