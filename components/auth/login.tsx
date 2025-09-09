"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginWithGoogle } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Google from "@/public/google.svg";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };


  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Welcome 👋</h1>
        <p className="text-sm text-gray-500">
          Sign in to continue to your account
        </p>
      </div>

      <form className="w-full max-w-sm">
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="max-w-full w-64 mx-auto flex items-center gap-2 rounded-lg"
              onClick={handleGoogleLogin}
              disabled={loading}
              type="button"
            >
              <Image src={Google} alt="G" className="w-6 h-6" />
              {loading ? "Logging in..." : "Login with Google"}
            </Button>
          </div>
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center w-full max-w-sm gap-2">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <span className="text-xs text-gray-400 text-center">
        No other options for now , kindly continue with google
      </span>

      {/* Info Text */}
      <p className="text-xs text-gray-500 text-center max-w-sm">
        We’ll never post anything without your permission. By continuing, you
        agree to our
        <span className="text-blue-600 cursor-pointer hover:underline">
          Terms
        </span>
        and
        <span className="text-blue-600 cursor-pointer hover:underline">
          Privacy Policy
        </span>
        .
      </p>

      {/* Success Message */}
      {user && (
        <div className="text-center text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg">
          🎉 Welcome back, {user.displayName || user.email}! Ready to explore?
        </div>
      )}
    </div>
  );
}
