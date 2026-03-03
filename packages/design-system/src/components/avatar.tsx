"use client";

import * as React from "react";
import { cn } from "./utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

function Avatar({ className, src, alt, size = "md", children, ...props }: AvatarProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-full", sizeMap[size], className)} {...props}>
        <img src={src} alt={alt || ""} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary-100 font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function AvatarFallback({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return <>{initials}</>;
}

export { Avatar, AvatarFallback };
