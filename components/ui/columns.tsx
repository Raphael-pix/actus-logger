"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  Delete,
  MoreHorizontal,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommentComponent from "@/components/commentOptions"

export type Report = {
  id: string;
  name: string;
  createdBy: string;
  date: string;
  type: "exel" | "pdf";
};
export type Channel = {
  id: string;
  name: string;
  title: string;
  type: "radio" | "tv";
  comment: string;
};

export const reportColumns: ColumnDef<Report>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: "CreatedBy",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const report = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(report.id)}
            >
              Copy Report ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Report details</DropdownMenuItem>
            <DropdownMenuItem className="space-x-2">
              <Save className="space-x-2" />
              <span>Save</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 space-x-2">
              <Delete size={14} />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const commentOptions: {
  TV: string[];
  Radio: string[];
} = {
  TV: ["less glitches", "no live view", "excessive glitches", "clear/ok"],
  Radio: ["white noise", "no modulation", "static", "clear/low power"],
};
export function getChannelsColumns(editMode: boolean,updateComment?: (id: string, value: string) => void): ColumnDef<Channel>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <p className="px-3">{row.getValue("name")}</p>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <p className="px-4 capitalize">{row.getValue("title")}</p>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <p className="px-4 capitalize">{row.getValue("type")}</p>
      ),
    },
    {
      accessorKey: "comment",
      header: "Comment",
      
      cell: ({ row,getValue }) => {
        const comment: string = row.getValue("comment");
        const type: keyof typeof commentOptions = row.getValue("type");
        const options = commentOptions[type];

        return editMode ? (
         <CommentComponent row={row} getValue={getValue} options={options} onUpdate={updateComment}/> 
        ) : (
          <p className="capitalize">{comment}</p>
        );
      },
    },
  ];
}
