"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setHeader } from "@/redux/headerSlice";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeader(["paths & Milestones"]));
  }, [dispatch]);

  return (
    <section className="grid grid-cols-1 mt-10 sm:mt-0  sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] justify-start gap-5 p-5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <PathCard key={idx} />
      ))}
    </section>
  );
}

function PathCard() {
  return (
    <Link href="/paths/id" className=" w-[320px] sm:w-full  block">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Health</CardTitle>
          <CardDescription>small desc</CardDescription>
          <CardAction>
            <Badge variant="outline">Active</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p>Tasks Count</p>
            <p className="text-sm">55</p>
          </div>

          <div>
            <p>Last Used</p>
            <p className="text-xs">{new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
