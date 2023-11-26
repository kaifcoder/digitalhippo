"use client";

import Lottie from "lottie-react";
import React from "react";
import animationData from "../../public/lottie/landing.json";

type Props = {};

const LandingAnim = (props: Props) => {
  return (
    <Lottie
      animationData={animationData}
      className="flex justify-center items-center"
      loop={true}
      style={{ width: "40%", height: "auto" }}
    />
  );
};

export default LandingAnim;
