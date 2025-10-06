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
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  MoreHorizontal,
  PlusIcon,
} from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

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

import { Milestone } from "@/types/milestone";

interface DataTableProps {
  data: Milestone[];
}

export const columns: ColumnDef<Milestone>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Milestone Name
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => (
      <span className="truncate w-48 block" title={row.original.name}>
        {row.original.name}
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
      <span
        className="truncate w-64 block"
        title={row.original.description}
      >
        {row.original.description}
      </span>
    ),
  },
  {
    accessorKey: "numTasks",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        No. of Tasks
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => <span className="pl-2">{row.original.numTasks}</span>,
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <span
        className="flex gap-2 cursor-pointer select-none items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created Date
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
      </span>
    ),
    cell: ({ row }) => (
      <span>{new Date(row.original.createdDate).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "completedDate",
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
      <span>{new Date(row.original.completedDate).toLocaleDateString()}</span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const milestone = row.original;
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
              onClick={() =>
                navigator.clipboard.writeText(milestone.milestoneId)
              }
            >
              Copy Milestone ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Milestone</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function MilestoneTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = String(filterValue).toLowerCase();
      const searchable = [
        row.original.name,
        row.original.description,
        row.original.numTasks,
        new Date(row.original.createdDate).toLocaleDateString(),
        new Date(row.original.completedDate).toLocaleDateString(),
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(search);
    },
  });

  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="sm:flex items-center py-4 gap-4 grid grid-cols-2">
        <Input
          placeholder="Search all milestones..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="md:max-w-sm col-span-2"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="self-start w-fit bg-inherit">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((c) => c.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <MilestoneEditor>
          <Button className="w-fit ml-auto">
            <PlusIcon /> Add new
          </Button>
        </MilestoneEditor>
      </div>

      {/* Table */}
      <ScrollArea className="overflow-hidden rounded-md border">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`px-3 py-3 truncate ${
                      header.column.id === "description"
                        ? "w-[260px]"
                        : "w-[180px]"
                    }`}
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
                <MilestoneEditor key={row.id}>
                  <TableRow key={row.id} className="gap-[4px]">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`px-3 py-2 truncate ${
                          cell.column.id === "description"
                            ? "w-[260px]"
                            : "w-[180px]"
                        }`}
                        title={String(cell.getValue())}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </MilestoneEditor>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No milestones found.
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

function MilestoneEditor({ children }: { children: React.ReactNode }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Milestone Editor</DrawerTitle>
          <DrawerDescription>
            Create or edit milestone details here.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
