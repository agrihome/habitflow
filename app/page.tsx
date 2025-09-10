"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setHeader } from "@/redux/headerSlice";
import { useEffect } from "react";

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeader(["home"]));
  }, [dispatch]);

  return <span className="p-5">In home</span>;
}
