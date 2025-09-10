"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { listenToAuthChanges } from "@/redux/authSlice";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../ui/Loader";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  useEffect(() => {
    if (status === "unauthenticated") {
      // Only redirect if not already on login/register
      if (pathname !== "/login" && pathname !== "/register") {
        router.push("/login");
      }
    }
  }, [status, router, pathname]);

  if (status === "idle" || status === "checking") {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
