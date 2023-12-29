"use client";

import { FC, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { logOut } from "@/lib/auth";
import { useRouter } from "next/router";

interface LogoutButtonProps {}

const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const signUserOut = async () => {
    setIsLoading(true);
    try {
      await logOut();
      router.replace("/login");
    } catch (error) {
      toast.error("Error signing out", {
        description: "Please try again later",
      });
    }
  };
  return (
    <div onClick={signUserOut} className="cursor-pointer w-full">
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Sign out
    </div>
  );
};

export default LogoutButton;
