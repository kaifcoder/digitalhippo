"use client";

import { trpc } from "@/trpc/client";
import { XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Lottie from "lottie-react";
import loadinganim from "../../public/lottie/loading-anim.json";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">Error verifying your email</h3>
        <p className="text-muted-foreground text-sm">
          This token may be invalid or expired.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative h-60 w-60 mb-4 text-muted-foreground">
          <Image src={"/hippo-email-sent.png"} fill alt="image of email sent" />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Your email has been verified.
        </p>
        <Link
          href="/sign-in"
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative h-80 w-80 mb-2 text-muted-foreground">
          <Lottie
            animationData={loadinganim}
            className="flex justify-center items-center w-full h-full"
            loop={true}
            placeholder="Loading..."
          />
        </div>
        <h3 className="font-semibold text-2xl">
          Verifying your email address...
        </h3>
      </div>
    );
  }
};

export default VerifyEmail;
