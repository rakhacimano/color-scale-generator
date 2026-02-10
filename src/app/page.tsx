"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useColorState } from "@/hooks/use-color-state";
import { PaletteDisplay } from "@/components/generator/palette-display";
import { PreviewSection } from "@/components/generator/preview-section";
import { ExportSection } from "@/components/generator/export-section";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Show, Hide, Send, InfoCircle, Category } from "react-iconly";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ColorPicker } from "@/components/ui/color-picker";
import ShinyText from "@/components/ui/shiny-text";

function ColorGenerator() {
  const { state, palette, updateState, mounted } = useColorState();
  const [activeTab, setActiveTab] = useState("palette");
  const [isDark, setIsDark] = useState(true);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Initialize dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Scroll-aware navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // Always show when near top
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide navbar
        setNavVisible(false);
      } else {
        // Scrolling up - show navbar
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRandom = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    updateState({ baseColor: randomColor });
    toast.success("New palette generated!");
  };

  // Space key for random color
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target === document.body || e.target === document.documentElement)) {
        e.preventDefault();
        handleRandom();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [updateState, palette]);

  if (!mounted) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const tabs = [
    { id: "palette", label: "Palette" },
    { id: "preview", label: "Preview" },
    { id: "export", label: "Export" },
  ];

  // Get a nice gradient from the palette
  const gradientStart = palette?.light[3]?.hex || '#a855f7';
  const gradientEnd = palette?.light[6]?.hex || '#ec4899';

  return (
    <div className="min-h-screen bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors duration-500 flex flex-col">
      {/* Light Rays Background */}
      {/* Light Rays Background - Commented out to show GridPattern */}
      {/* <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
        <LightRays
          speed={40}
          color={isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/80 via-transparent to-zinc-50/80 dark:from-zinc-950/80 dark:via-transparent dark:to-zinc-950/80" />
      </div> */}

      {/* Scroll-Aware Header */}
      <motion.header
        className="fixed w-full z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl"
        initial={{ y: 0 }}
        animate={{ y: navVisible ? 0 : -80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/">
              <Image
                src={isDark ? "/logocolorwhite.png" : "/logocolorblack.png"}
                alt="Colowr"
                width={120}
                height={32}
                className="h-7 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {/* Share Button */}

            <Link
              href="/oklch"
              className="hidden sm:flex items-center gap-1.5 text-sm px-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              What is OKLCH?
            </Link>
            <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-9 px-3 gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <span className="hidden sm:inline text-sm">Share</span>
            </Button>

            {/* <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" /> */}

            {/* Theme Toggle */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 px-3 gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <span className="hidden sm:inline text-sm">{isDark ? 'Light' : 'Dark'}</span>
            </Button> */}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden h-9 w-9 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 ml-1"
            >
              <Category set="bold" size={20} primaryColor="currentColor" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                <Link
                  href="/oklch"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <InfoCircle set="bold" size={20} primaryColor="currentColor" />
                  <span className="font-medium">What is OKLCH?</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto px-6 py-12 space-y-12">

        {/* Hero */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-3xl md:text-4xl font-bold tracking-tight">
            <ShinyText text="Generate beautiful color scales" speed={3} />
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Create OKLCH-based color palettes optimized for both light and dark modes.
            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">Space</kbd> for a random color.
          </p>
        </motion.div>

        {/* Color Input Card */}
        <motion.div
          className="mx-auto w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/20">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Base Color
              </Label>
              <ColorPicker
                color={state.baseColor}
                onChange={(color) => updateState({ baseColor: color })}
              />
            </div>
          </div>
        </motion.div>

        {/* Centered Tabs */}
        <div className="flex justify-center">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "palette" && (
            <motion.div
              key="palette"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <PaletteDisplay palette={palette} />
            </motion.div>
          )}
          {activeTab === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <PreviewSection palette={palette} />
            </motion.div>
          )}
          {activeTab === "export" && (
            <motion.div
              key="export"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ExportSection palette={palette} prefix="primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-zinc-200/50 dark:border-zinc-800/50 py-12">
        <div className="container mx-auto px-6">
          <p className="text-center text-base text-zinc-400 dark:text-zinc-500">
            © 2026 Colowr • Made with ❤️ by <span className="font-medium text-zinc-600 dark:text-zinc-300">Cimano</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950" />}>
      <ColorGenerator />
    </Suspense>
  );
}
