"use client";

  import React from "react";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import {
    LayoutDashboard,
    BarChart3,
    Users,
    DollarSign,
    Wallet,
    BookOpen,
    Wrench,
    Newspaper,
    MessageSquare,
    Settings,
    HelpCircle,
  } from "lucide-react";

  const sidebarItems = [
    { label: "Dashboard", href: "/affiliate", icon: LayoutDashboard },
    { label: "Analytics", href: "/affiliate/analytics", icon: BarChart3 },
    { label: "Referrals", href: "/affiliate/referrals", icon: Users },
    { label: "Earnings", href: "/affiliate/earnings", icon: DollarSign },
    { label: "Payouts", href: "/affiliate/payouts", icon: Wallet },
    { label: "Resources", href: "/affiliate/resources", icon: BookOpen },
    { label: "Tools", href: "/affiliate/tools", icon: Wrench },
    { label: "News", href: "/affiliate/news", icon: Newspaper },
    { label: "Messages", href: "/affiliate/messages", icon: MessageSquare },
    { label: "Settings", href: "/affiliate/settings", icon: Settings },
    { label: "Support", href: "/affiliate/support", icon: HelpCircle },
  ];

  export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Affiliate Portal</h2>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }
  