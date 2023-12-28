"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

import { Icons } from "@/components/icons";

import { useCartState } from "@/store/cart";
import { Button, buttonVariants } from "@ui/button";
import { cn } from "@/lib/utils";
import { User, getUser, verifyAuth } from "@/lib/auth";

const SideNavigation = () => {
  const { total_unique_items } = useCartState();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const handle = async () => {
      try {
        const isLogged = await verifyAuth();
        if (isLogged) {
          const userData = await getUser();
          console.log(userData);
          setUser(userData); // Set user data in the state
        }
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
      }
    };

    handle();
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="hidden sm:block">
        {user ? (
          // If user is logged in, show user's name
          <Link
            href="/account"
            className={buttonVariants({ variant: "secondary" })}
          >
            {`Hii, ${user.firstname}!`}
          </Link>
        ) : (
          // If user is not logged in, show login link
          <Link
            href="/login"
            className={buttonVariants({ variant: "secondary" })}
          >
            Login
          </Link>
        )}
      </div>

      <Link
        href="/cart"
        className={cn(buttonVariants({ variant: "ghost" }), "relative px-2")}
      >
        <Icons.shoppingCart className="w-6 h-6 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100" />
        {total_unique_items > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-[10px] leading-none text-red-100 bg-red-600 rounded-full">
            {total_unique_items}
          </span>
        )}
      </Link>
    </div>
  );
};

export default SideNavigation;
