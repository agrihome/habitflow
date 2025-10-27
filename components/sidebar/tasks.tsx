"use client";

import {
  Milestone,
  CalendarDays,
} from "lucide-react";


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Box } from "lucide-react";
import Link from "next/link";

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Paths & Tasks</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/tasks">
              <CalendarDays />
              Tasks
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/paths">
              <Milestone />
              Paths & Milestones
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/mindbox">
              <Box />
              MindBox
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
