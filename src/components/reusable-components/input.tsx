import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../utils/utils";

const buttonVariants = cva(
  "flex h-10 w-full rounded-md border border-slate-300 bg-gray-50 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:bg-gray-700 dark:text-slate-50 dark:placeholder-gray-400 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
  {
    variants: {
      icon: {
        true: "pl-10",
      },
    },
    defaultVariants: {
      icon: false,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof buttonVariants>, "icon"> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
        <input
          className={cn(buttonVariants({ icon: !!icon, className }))}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, buttonVariants };
