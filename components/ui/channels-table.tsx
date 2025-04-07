"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
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
import CreateReportBtn from "@/components/createReportBtn";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { locations } from "@/constant";
import { ChevronDown, Pen } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

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
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 16,
  });

  const [isLocationMenuOpen, setIsLocationMenuOpen] =
    React.useState<boolean>(false);
  const [rowSelection, setRowSelection] = React.useState({});
  const locationFilter = searchParams.get("location") || "all";
  const isEditing = searchParams.get("editMode");
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
      toast.custom(
        (t) => (
          <div className="bg-background border border-border rounded-sm  flex flex-col space-y-2 p-4">
            <p className="text-sm font-medium text-foreground">
              You have unsaved changes
            </p>
            <p className="text-xs text-accent-foreground">
              Do you want to save your changes before exiting edit mode?
            </p>
            <div className="flex items-center justify-end mt-3 space-x-2">
              <button
                onClick={() => {
                  toast.dismiss(t);
                  // discard changes and exit edit mode
                  const params = new URLSearchParams(searchParams);
                  params.delete("editMode");
                  router.push(`?${params.toString()}`, { scroll: false });
                }}
                className="px-3 py-1 text-sm bg-chart-1 rounded-md text-neutral-white"
              >
                Discard
              </button>
              <button
                onClick={async () => {
                  await saveChanges(data);
                  toast.dismiss(t);
                }}
                className="px-3 py-1 text-sm bg-neutral-black rounded-md text-neutral-white"
              >
                Save & Exit
              </button>
            </div>
          </div>
        ),
        {
          position: "top-center",
          duration:Infinity
        }
      );
    } else {
      params.set("editMode", "true");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };
  //Function to save comment changes
  const saveChanges = async (data: TData[]) => {
    try {
      const res = await fetch("/api/update-channels", {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save changes");

      toast.success("Changes saved!");

      const params = new URLSearchParams(searchParams);
      params.delete("editMode");
      router.push(`?${params.toString()}`, { scroll: false });
    } catch (err) {
      toast.error("Failed to save changes");
      console.error(err);
    }
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: locationFilter !== "all",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
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
            className={clsx(
              isEditing
                ? "bg-neutral-black text-neutral-white hover:bg-neutral-black hover:text-neutral-white"
                : "bg-transparent text-neutral-black",
              "transition-colors cursor-pointer"
            )}
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
      <div className="w-full flex items-center justify-between">
        {locationFilter === "all" && (
          <div className="flex items-center  space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
        <div className="ml-auto flex items-center space-x-2 py-4">
          <CreateReportBtn table={table} location={locationFilter} />
          <Button variant="default" size="sm" onClick={() => saveChanges(data)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
