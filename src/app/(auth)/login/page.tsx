import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: {
    default: "Login",
    template: `%s | ${siteConfig.name}`,
  },
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8 flex justify-center space-x-2"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>

      <UserAuthForm />
    </div>
  );
}
