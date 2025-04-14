"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

const CreateReportBtn = ({ table, location }) => {
  const handleExport = () => {
    const data = table.getRowModel().rows.map((row) => ({
      Name: row.original.name,
      Title: row.original.title,
      Type: row.original.type,
      Comment: row.original.comment,
    }));

    const siteName = location === "" ? "all" : location;
    const fileName = `ACTUS_recording_report_for_${siteName}.xlsx`;

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: ["Name", "Title", "Type", "Comment"],
    });

    // Optional: Set column widths
    worksheet["!cols"] = [
      { wch: 20 }, // Name
      { wch: 30 }, // Title
      { wch: 15 }, // Type
      { wch: 40 }, // Comment
    ];

    // Optional: Add borders to all cells
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellAddress]) continue;

        worksheet[cellAddress].s = {
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
          alignment: {
            vertical: "center",
            horizontal: "left",
          },
        };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Write file
    XLSX.writeFile(workbook, fileName);
  };

  // TODO: Update the function to able to save the file to reports collection

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      Create Report
    </Button>
  );
};

export default CreateReportBtn;
