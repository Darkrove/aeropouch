"use client";

import React, { use, useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

import { Icons } from "@/components/icons";

import { useCartState } from "@/store/cart";
import { Button, buttonVariants } from "@ui/button";
import { cn } from "@/lib/utils";
import { User, getUser, logOut, verifyAuth } from "@/lib/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import LogoutButton from "../logout-btn";

const SideNavigation = () => {
  const { total_unique_items } = useCartState();
  const [isLogged, setIsLogeed] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const handle = async () => {
      try {
        const isLogged = await verifyAuth();
        console.error("isLogged:", isLogged);

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
          // <Link
          //   href="/account"
          //   className={buttonVariants({ variant: "secondary" })}
          // >
          //   {`Hii, ${user.firstname}!`}
          // </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="relative">
                {`Hii, ${user.firstname}!`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {`${user.firstname} ${user.lastname}`}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
