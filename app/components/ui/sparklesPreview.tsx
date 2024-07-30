"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";

const SparklesPreview: React.FC = React.memo(() => {
  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-visible rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.1}
          maxSize={0.2}
          particleDensity={1}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
});

export { SparklesPreview };
