"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import {
  Paintbrush,
  FileText,
  File,
  CreditCard,
  Share2,
  Puzzle,
  Key,
  Mail,
  Bot,
  ShieldCheck,
  Megaphone,
} from "lucide-react";

const setupNavItems = [
  { label: "Branding", href: "/admin/setup/branding", icon: Paintbrush },
  { label: "Content", href: "/admin/setup/content", icon: FileText },
  { label: "Pages", href: "/admin/setup/pages", icon: File },
  { label: "Pricing", href: "/admin/setup/pricing", icon: CreditCard },
  { label: "Social Links", href: "/admin/setup/social", icon: Share2 },
  { label: "Features", href: "/admin/setup/features", icon: Puzzle },
  { label: "API Keys", href: "/admin/setup/api-keys", icon: Key },
  { label: "Email Templates", href: "/admin/setup/email", icon: Mail },
  { label: "AI / Support", href: "/admin/setup/ai", icon: Bot },
  { label: "Security", href: "/admin/setup/security", icon: ShieldCheck },
  { label: "PassivePost", href: "/admin/setup/passivepost", icon: Megaphone },
];

export function SetupSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-56 shrink-0 border-r bg-muted/30 p-3 space-y-1">
      <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Setup
      </p>
      {setupNavItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
