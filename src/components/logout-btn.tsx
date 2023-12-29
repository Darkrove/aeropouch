"use client";

import { FC, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { actionLogOut } from "@/lib/server-actions/auth-actions";
import { logOut } from "@/lib/auth";

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
    <div
      onClick={signUserOut}
      className="cursor-pointer w-full flex justify-between items-center"
    >
      Sign out
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
    </div>
  );
};

export default LogoutButton;
