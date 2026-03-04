"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="checkbox"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:ring-offset-gray-950",
          checked
            ? "bg-primary-600 border-primary-600 text-white dark:bg-primary-500 dark:border-primary-500"
            : "bg-white dark:bg-gray-900",
          className
        )}
        {...props}
      >
        {checked && <Check className="h-3.5 w-3.5" />}
      </button>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
