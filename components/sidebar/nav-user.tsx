"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/authSlice"; // we'll use this
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleUser, ChevronsUpDown, LogOut } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LoginForm } from "@/components/auth/login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export function NavUser() {
  const { isMobile } = useSidebar();

  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {!user ? (
          // SIGN IN DIALOG
          <Dialog open={status === "unauthenticated" ? true : false}>
            <DialogTrigger asChild>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5 h-12"
              >
                <a href="#">
                  <CircleUser className="!size-5" />
                  <span>Sign In</span>
                </a>
              </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mt-8 text-center">Sign In</DialogTitle>
              </DialogHeader>
              <LoginForm />
            </DialogContent>
          </Dialog>
        ) : (
          // USER DROPDOWN
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.photoURL ?? ""}
                    alt={user.email ?? ""}
                  />
                  <AvatarFallback className="rounded-lg bg-red-400">
                    {user.email ? user.email[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.displayName ?? "Anonymous"}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.photoURL ?? ""}
                      alt={user.email ?? ""}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.email ? user.email[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.displayName ?? "Anonymous"}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <CircleUser className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => dispatch(logoutUser())}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
