import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const heroButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-primary text-primary-foreground hover:shadow-glow px-8 py-4 hover:scale-105 hover:-translate-y-1",
        secondary: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 hover:scale-105 hover:-translate-y-1",
        outline: "border border-card-border bg-background hover:bg-muted text-foreground px-6 py-3 hover:scale-105",
      },
      size: {
        default: "px-8 py-4",
        sm: "px-6 py-3 text-sm",
        lg: "px-10 py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface HeroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heroButtonVariants> {
  asChild?: boolean;
}

const HeroButton = React.forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(heroButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
HeroButton.displayName = "HeroButton";

export { HeroButton, heroButtonVariants };