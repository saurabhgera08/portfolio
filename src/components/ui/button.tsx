import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA - Deep Slate Blue
        default: "bg-primary text-primary-foreground hover:bg-charcoal shadow-subtle hover:shadow-hover",
        // Secondary - Light Gray
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-muted",
        // Ghost/Minimal
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        // Outline - Bordered
        outline: "border border-primary bg-transparent text-primary hover:bg-background",
        // Destructive
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Link style
        link: "text-primary underline-offset-4 hover:underline",
        // Accent - Warm Amber (for special CTAs)
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-subtle hover:shadow-hover",
        // Teal - Success/Positive actions
        teal: "bg-teal text-teal-foreground hover:bg-teal/90 shadow-subtle hover:shadow-hover",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-sm px-4 text-sm",
        lg: "h-11 rounded-sm px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };