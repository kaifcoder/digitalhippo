"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialValidator,
  TAuthCredentialValidator,
} from "@/lib/validators/account-credential-validator";
import { trpc } from "@/trpc/client";

type Props = {};

const page = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<TAuthCredentialValidator>({
    resolver: zodResolver(AuthCredentialValidator),
  });
  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({});
  const onSubmit = ({ email, password }: TAuthCredentialValidator) => {
    mutate({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="w-20 h-20" />
            <h1 className="text-2xl font-bold">Create an Account</h1>

            <Link
              href={"/sign-in"}
              className={buttonVariants({
                variant: "link",
                className: "text-muted-foreground",
              })}
            >
              Already have a account? Sign In
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1.5 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="johndoe@gmail.com"
                  />
                </div>
                <div className="grid gap-1.5 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="*********"
                  />
                </div>
                <Button>Sign Up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
