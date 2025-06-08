
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const premiumButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform hover:scale-105 active:scale-95 relative overflow-hidden group",
  {
    variants: {
      variant: {
        premium: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-blue-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        luxury: "bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 text-white shadow-2xl hover:shadow-orange-500/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-500 before:via-orange-400 before:to-red-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        elegant: "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white border border-slate-600/50 shadow-2xl hover:shadow-slate-500/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-slate-700 before:via-slate-600 before:to-slate-800 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        glass: "bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl hover:bg-white/20 hover:shadow-white/20",
        neon: "bg-transparent border-2 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/25 hover:bg-cyan-400/10 hover:shadow-cyan-400/50 hover:text-cyan-300 transition-all duration-300",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-xl",
        default: "h-12 px-6 py-3 text-base",
        lg: "h-14 px-8 py-4 text-lg rounded-2xl",
        xl: "h-16 px-10 py-5 text-xl rounded-3xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "premium",
      size: "default",
    },
  }
)

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof premiumButtonVariants> {
  asChild?: boolean
  loading?: boolean
  glow?: boolean
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant, size, asChild = false, loading, glow, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          premiumButtonVariants({ variant, size, className }),
          glow && "animate-pulse shadow-2xl",
          loading && "cursor-not-allowed"
        )}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-1" />
        )}
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  }
)
PremiumButton.displayName = "PremiumButton"

export { PremiumButton, premiumButtonVariants }
