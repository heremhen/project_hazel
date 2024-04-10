"use client";

import Lottie from "lottie-react";
import animationData from "@/../public/lottie/loading.json";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10/12 sm:w-1/2 lg:w-1/4">
        <Lottie
          animationData={animationData}
          className="flex justify-center items-center"
          loop={true}
        />
      </div>
    </div>
  );
}
