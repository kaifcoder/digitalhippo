"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Lottie from "lottie-react";
import Link from "next/link";
import notFoundAnim from "../../public/lottie/404.json";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center">
      <Lottie
        animationData={notFoundAnim}
        className="flex justify-center items-center"
        loop={true}
        marginHeight={0}
        cellPadding={0}
        style={{ width: "50%", height: "auto", margin: "0 auto" }}
      />
      <div>
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost",
            size: "lg",
          })}
        >
          Go back to Home
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
