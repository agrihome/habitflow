"use client";
import { LoginForm } from "@/components/auth/login";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const { user, status } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const next = searchParams.get("next");

    if (status !== "unauthenticated") {
      router.push(next || "/");
    }
  }, [status]);

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        <DialogHeader className="hidden">
          <DialogTitle className="mt-8 text-center">Sign In</DialogTitle>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
