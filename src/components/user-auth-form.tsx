"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { setCustomer } from "@/store/actions/authenticateActions";
import { actionSignUpUser } from "@/lib/server-actions/auth-actions";
import { getToken } from "@/lib/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isExchangeToken, setIsExchangeToken] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  React.useEffect(() => {
    const token = searchParams?.get("token");

    const handleLogin = async () => {
      if (!token) {
        return;
      }

      try {
        setIsExchangeToken(true);
        setMessage("Logging");
        const jwt = await getToken(token);
        if (jwt) {
          setMessage("Redirecting");
          setCustomer();
          router.replace("/");
        }
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
        setIsError(true);
        setMessage("There was an error logging in with Email, Please retry!");
        // setMessage(error?.data?.error?.errors.email)
        toast.error("Something went wrong", {
          description:
            "There was an error logging in with Email, Please retry!",
        });
      } finally {
        setIsExchangeToken(false);
      }
    };

    handleLogin();
  }, [message, router, searchParams]);

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      const signInResult = await actionSignUpUser(
        data.email.toLowerCase(),
        `${window.location.origin}/login?token={token}`
      );

      if (!signInResult) {
        return toast.error("Something went wrong.", {
          description: "Your sign in request failed. Please try again.",
        });
      }

      return toast.success("Check your email", {
        description:
          "We sent you a login link. Be sure to check your spam too.",
      });
    } catch (error) {
      setIsError(true);
      setMessage("Your sign in request failed. Please try again.");
      console.log(error);
      // setMessage(error?.data?.error?.errors.email)
      toast.error("Something went wrong", {
        description: "Your sign in request failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {isExchangeToken ? (
        <div className="flex flex-col justify-center items-center space-y-2">
          {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
          <div className="loader-pulse"></div>
          <h1 className="text-2xl font-semibold tracking-tight">{message}</h1>
        </div>
      ) : (
        <>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Icons.logo className="mx-auto h-6 w-6" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...register("email")}
                  />
                  {errors?.email && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <button className={cn(buttonVariants())} disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In with Email
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
