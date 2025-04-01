"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import exportFromJSON from 'export-from-json';

const CreateReportBtn = ({ table, location }) => {
  const handleExport = () => {
    // Extract table data
    const data = table.getRowModel().rows.map((row) => ({
      Name: row.original.name,
      Title: row.original.title,
      Type: row.original.type,
      Comment: row.original.comment,
    }));
    
    const siteName = location === "" ? "all" : location;
    const fileName = `ACTUS_recording_report_for_${siteName}`;
    const exportType = 'xls';
    
    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      Create Report
    </Button>
  );
};

export default CreateReportBtn;