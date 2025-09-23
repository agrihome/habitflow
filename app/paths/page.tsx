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
    <section className="flex flex-wrap justify-start gap-5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <PathCard key={idx} />
      ))}
    </section>
  );
}

function PathCard() {
  return (
    <Link href="/paths/id">
      <Card className="min-w-xs">
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
