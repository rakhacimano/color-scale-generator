"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Tab {
    id: string
    label: string
}

interface TabsProps {
    tabs: Tab[]
    activeTab: string
    onChange: (id: string) => void
    className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
    return (
        <div className={cn("inline-flex h-10 items-center justify-center rounded-lg bg-zinc-100 p-1 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        "relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
                        activeTab === tab.id ? "text-zinc-950 dark:text-zinc-50" : "hover:text-zinc-900 dark:hover:text-zinc-50"
                    )}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-white shadow-sm rounded-md dark:bg-zinc-950"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    )
}
