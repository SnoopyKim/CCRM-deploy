"use client";
import useAuthStore from "@/app/_utils/auth/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, []);
  return children;
}
