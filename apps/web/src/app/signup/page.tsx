"use client";

import { SignupForm } from "@musekit/auth";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <SignupForm redirectTo="/login" />
      </main>
      <Footer />
    </div>
  );
}
