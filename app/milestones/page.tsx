"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setHeader } from "@/redux/headerSlice";
import { useEffect, useState } from "react";

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeader(["milestones"]));
  }, [dispatch]);

  return <div>1</div>;
}
