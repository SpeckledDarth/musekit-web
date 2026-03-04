"use client";

import { PasswordResetForm } from "@musekit/auth";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <PasswordResetForm />
      </main>
      <Footer />
    </div>
  );
}
