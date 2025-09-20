"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Task } from "@/types/task";

interface DataTableProps {
  data: Task[];
}

// ----------------------
// Column definitions
// ----------------------
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "taskName",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Task Name
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => (
      <span className="truncate w-40 block" title={row.original.taskName}>
        {row.original.taskName}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => (
      <span className="truncate w-56 block" title={row.original.description}>
        {row.original.description}
      </span>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => <span>{row.original.priority}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => <span>{row.original.status}</span>,
  },
  {
    accessorKey: "originalCompletionDate",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Original Date
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => (
      <span>
        {new Date(row.original.originalCompletionDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "actualCompletionDate",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Completed Date
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => (
      <span>
        {new Date(row.original.actualCompletionDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "isPostponed",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Postponed?
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => (row.original.isPostponed ? "Yes" : "No"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="cursor-pointer h-8 w-8 flex items-center justify-center">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.taskId)}
            >
              Copy Task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ----------------------
// DataTable component with global search
// ----------------------
export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>(""); // single input filter
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = String(filterValue).toLowerCase();

      // Create a single searchable string from the row data, matching the displayed format
      const searchableRowContent = [
        row.original.taskName,
        row.original.description,
        row.original.priority,
        row.original.status,
        new Date(row.original.originalCompletionDate).toLocaleDateString(),
        new Date(row.original.actualCompletionDate).toLocaleDateString(),
        row.original.isPostponed ? "yes" : "no",
      ]
        .join(" ")
        .toLowerCase();

      return searchableRowContent.includes(search);
    },
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      {/* Global Filter + Column toggle */}
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <ScrollArea className="overflow-hidden rounded-md border">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="gap-[4px]">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`
              px-3 py-3 truncat
              ${header.column.id === "description" ? "w-[250px]" : "w-[160px]"}
            `}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="gap-[4px]">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`
                px-3 py-2 truncate
                ${cell.column.id === "description" ? "w-[250px]" : "w-[160px]"}
              `}
                      title={String(cell.getValue())}
                    >
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
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Footer */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
      </div>
    </div>
  );
}
