"use client";

import { LoginForm } from "@musekit/auth";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <LoginForm redirectTo="/dashboard" />
      </main>
      <Footer />
    </div>
  );
}
