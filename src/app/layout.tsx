import "@styles/globals.css";

import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/layouts/main-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/store/cart";
import { docsConfig } from "@/config/docs";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
              <Toaster richColors />
            </div>
          </CartProvider>
        </body>
      </html>
    </>
  );
}
