"use client";

import { AdminLayout } from "@musekit/admin";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
