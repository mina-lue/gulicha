"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // If no token found → redirect to login
    if (!token) {
      router.replace("/en/admin/login");
    }
  }, [router]);
}