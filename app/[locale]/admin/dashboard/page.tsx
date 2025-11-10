"use client";

import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import Link from "next/link";

export default function AdminDashboard() {
  useAuthGuard();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>
      <Link href="/admin/new" className="btn btn-primary bg-blue-600 p-2 rounded text-gray-100">Add Listing</Link>
      <Link href="/" className="btn btn-primary bg-blue-600 p-2 rounded text-gray-100 ml-4">Check Listings</Link>
    </div>
  );
}