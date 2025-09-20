"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setHeader } from "@/redux/headerSlice";
import { useEffect } from "react";
import { DataTable } from "@/components/ui/datatable";
import type { Task } from "@/types/task";

import data from "./data.json";

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeader(["tasks"]));
  }, [dispatch]);

  return <DataTable data={data as Task[]} />;
}
