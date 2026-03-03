"use client";

import * as React from "react";
import { cn } from "./utils";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

function Sidebar({ className, collapsed, children, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-gray-200 bg-white transition-all dark:border-gray-700 dark:bg-gray-900",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

function SidebarSection({ className, title, children, ...props }: SidebarSectionProps) {
  return (
    <div className={cn("px-3 py-2", className)} {...props}>
      {title && (
        <h4 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </h4>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: string;
}

function SidebarItem({ className, href, icon, active, badge, children, ...props }: SidebarItemProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        className
      )}
      {...props}
    >
      {icon && <span className="flex h-5 w-5 items-center justify-center">{icon}</span>}
      <span className="flex-1">{children}</span>
      {badge && (
        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
          {badge}
        </span>
      )}
    </a>
  );
}

export { Sidebar, SidebarSection, SidebarItem };
