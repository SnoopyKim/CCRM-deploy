"use client";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (Cookies.get("token")) {
      redirect("/");
    }
  }, []);
  return children;
}
