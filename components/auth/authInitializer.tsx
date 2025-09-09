"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { listenToAuthChanges } from "@/redux/authSlice";
import Loader from "../ui/Loader";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (status === "idle" || status === "checking") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
