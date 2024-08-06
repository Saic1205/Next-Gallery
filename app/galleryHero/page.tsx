"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "../components/ui/sparkles";
import { useRouter } from "next/navigation";
import randomColor from "randomcolor";

const GalleryHero: React.FC = () => {
  const router = useRouter();
  const [currentColor, setCurrentColor] = useState<string>(randomColor());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor(randomColor());
    }, 10000); // 10000 ms = 10 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="#000"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={1000}
          className="w-full h-full"
          particleColor="#fff"
        />
      </div>
      <h1
        className="prose md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20 cursor-pointer"
        onClick={() => router.push("login")}
      >
        Next GallerY!
      </h1>
    </div>
  );
};

export default GalleryHero;
