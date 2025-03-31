"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { locations } from "@/constant";
import { ChevronDown, Pen } from "lucide-react";

interface ChannelsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ChannelsDataTable<TData, TValue>({
  columns,
  data,
}: ChannelsDataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [typeFilters, setTypeFilters] = React.useState<string>("all");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [isLocationMenuOpen, setIsLocationMenuOpen] =
    React.useState<boolean>(false);
  const [rowSelection, setRowSelection] = React.useState({});
  const locationFilter = searchParams.get("location") || "all";
  const isEditing = searchParams.get("editMode") === "true";
  // Function to update the URL with selected location
  const updateLocationFilter = (location: string) => {
    const params = new URLSearchParams(searchParams);
    if (location === "all") {
      params.delete("location");
    } else {
      params.set("location", location);
    }
    router.push(`?${params.toString()}`);
  };
  // Function to toggle edit mode in URL
  const toggleEditMode = () => {
    const params = new URLSearchParams(searchParams);
    if (isEditing) {
      params.delete("editMode"); // Remove editMode param when toggling off
    } else {
      params.set("editMode", "true");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex gap-2 items-center py-4">
        <DropdownMenu onOpenChange={setIsLocationMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="black" className="flex items-center gap-3 text-lg">
              <span className="capitalize">{locationFilter}</span>
              <ChevronDown
                size={16}
                className={`${
                  isLocationMenuOpen ? "rotate-180" : "rotate-0"
                } transition-all duration-400`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {locations.map((location) => (
              <DropdownMenuCheckboxItem
                key={location.id}
                className="capitalize checked:bg-neutral-black checked:text-neutral-white"
                checked={locationFilter === location.name}
                onCheckedChange={() => updateLocationFilter(location.name)}
              >
                {location.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2 items-center ml-auto">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table
                .getColumn("type")
                ?.setFilterValue(typeFilters === "all" ? "" : typeFilters);
              table.getColumn("name")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="capitalize">
                {typeFilters} ({table.getRowCount()})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                className="capitalize"
                checked={typeFilters === "all"}
                onCheckedChange={() => {
                  setTypeFilters("all");
                  table.getColumn("type")?.setFilterValue("");
                }}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="capitalize"
                checked={typeFilters === "tv"}
                onCheckedChange={() => {
                  setTypeFilters("tv");
                  table.getColumn("type")?.setFilterValue("tv");
                }}
              >
                TV
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="capitalize"
                checked={typeFilters === "radio"}
                onCheckedChange={() => {
                  setTypeFilters("radio");
                  table.getColumn("type")?.setFilterValue("radio");
                }}
              >
                Radio
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            className={`${isEditing ? "bg-neutral-black text-neutral-white hover:bg-neutral-black hover:text-neutral-white" : "text-neutral-black" } transition-colors cursor-pointer`}
            onClick={toggleEditMode}
          >
            <Pen size={16} />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          Create Report
        </Button>
        <Button variant="outline" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
