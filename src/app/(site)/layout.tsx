import "@styles/globals.css";
import type { Metadata } from "next";

import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/layouts/main-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/store/cart";
import { docsConfig } from "@/config/docs";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
