
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] text-white shadow-2xl hover:shadow-[0_20px_40px_rgba(160,132,255,0.4)] hover:from-[#8B6AE6] hover:via-[#0090D9] hover:to-[#14E05A] backdrop-blur-sm",
        secondary: "bg-gradient-to-r from-gray-800/90 to-gray-900/90 text-white border border-gray-600/50 hover:from-gray-700/90 hover:to-gray-800/90 shadow-xl backdrop-blur-sm hover:border-gray-500/50",
        tertiary: "bg-transparent border-2 border-violet-500/60 text-violet-300 hover:bg-violet-500/20 hover:text-violet-200 hover:border-violet-400/80 backdrop-blur-sm",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-[0_20px_40px_rgba(34,197,94,0.4)]",
        warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:from-yellow-600 hover:to-orange-600 hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)]",
        danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg hover:from-red-600 hover:to-pink-700 hover:shadow-[0_20px_40px_rgba(239,68,68,0.4)]",
        ghost: "hover:bg-accent hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        default: "h-11 px-6 py-2 text-base",
        lg: "h-14 px-8 py-3 text-lg rounded-2xl",
        xl: "h-16 px-10 py-4 text-xl rounded-2xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean
  loading?: boolean
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(enhancedButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-1" />
        )}
        {children}
      </Comp>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, enhancedButtonVariants }
