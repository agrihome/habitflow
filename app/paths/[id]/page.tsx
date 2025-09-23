"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  
} satisfies ChartConfig;
export function Component() {
  return (
    <ChartContainer config={chartConfig} className=" w-full h-[200px]">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}

export default function Page() {
  return (
    <section className="flex flex-col">
      <h1 className="text-center font-medium text-2xl mt-5">Health</h1>
      <Tabs defaultValue="dashboard">
        <TabsList className="p-2 h-14 text-md">
          <TabsTrigger value="dashboard" className="px-4 py-2">
            <Link href="">Dashboard</Link>
          </TabsTrigger>

          <TabsTrigger value="details" className="px-4 py-2">
            <Link href="">Details</Link>
          </TabsTrigger>
          <TabsTrigger value="kra" className="px-4 py-2">
            <Link href="">KRA</Link>
          </TabsTrigger>
          <TabsTrigger value="kc" className="px-4 py-2">
            <Link href="">KC</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Component></Component>
    </section>
  );
}
