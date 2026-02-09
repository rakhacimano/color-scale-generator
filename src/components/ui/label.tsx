"use client"

import * as React from "react"
// Removed unused import
// I didn't install @radix-ui/react-label.
// I should make a simple one or install it. 
// User asked to install specific dependencies. I haven't installed Radix.
// I will build a simple Label without Radix for now to avoid extra install steps unless necessary.
// Actually, standard HTML label with standard classes is fine.

import { cn } from "@/lib/utils"

const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    />
))
Label.displayName = "Label"

export { Label }
