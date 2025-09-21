"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setHeader } from "@/redux/headerSlice";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/tasks/datatable";
import type { Task } from "@/types/task";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";


import data from "./data.json";

export default function Page() {
  const dispatch = useAppDispatch();

  const [active, setActive] = useState("Today");

  const filters = [
    "Tomorrow",
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "Overall",
  ];

  useEffect(() => {
    dispatch(setHeader(["tasks"]));
  }, [dispatch]);

  return (
    <div>
      <ScrollArea className="w-full text-sm  border-1 rounded-md p-1 max-w-max">
        <div className="flex flex-nowrap justify-start gap-2  overflow-hidden">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={active === filter ? "default" : "ghost"}
              onClick={() => setActive(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DataTable data={data as Task[]} />
    </div>
  );
}


