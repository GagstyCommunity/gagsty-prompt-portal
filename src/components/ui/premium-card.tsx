
import * as React from "react"
import { cn } from "@/lib/utils"

const PremiumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "glass" | "luxury" | "elegant" | "neon" | "gradient"
    glow?: boolean
  }
>(({ className, variant = "glass", glow, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden group",
      {
        "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-white/20": variant === "glass",
        "bg-gradient-to-br from-yellow-600/20 via-orange-500/20 to-red-600/20 backdrop-blur-2xl border border-orange-500/30 shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40": variant === "luxury",
        "bg-gradient-to-br from-slate-800/80 via-slate-700/80 to-slate-900/80 backdrop-blur-2xl border border-slate-600/30 shadow-2xl hover:border-slate-500/50": variant === "elegant",
        "bg-transparent border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/25 hover:bg-cyan-400/5 hover:border-cyan-400/70 hover:shadow-cyan-400/40": variant === "neon",
        "bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40": variant === "gradient",
      },
      glow && "animate-pulse shadow-2xl",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{props.children}</div>
  </div>
))
PremiumCard.displayName = "PremiumCard"

const PremiumCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 mb-6", className)}
    {...props}
  />
))
PremiumCardHeader.displayName = "PremiumCardHeader"

const PremiumCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))
PremiumCardTitle.displayName = "PremiumCardTitle"

const PremiumCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-white/70 leading-relaxed", className)}
    {...props}
  />
))
PremiumCardDescription.displayName = "PremiumCardDescription"

const PremiumCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
))
PremiumCardContent.displayName = "PremiumCardContent"

export { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardDescription, PremiumCardContent }
