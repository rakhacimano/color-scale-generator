import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Colowr - Design System Color Generator",
  description: "Generate beautiful OKLCH color palettes for your design system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} ${sora.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
