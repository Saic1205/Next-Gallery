"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "../components/ui/sparkles";
import { useRouter } from "next/navigation";

const GalleryHero: React.FC = () => {
  const router = useRouter();
  const colors: string[] = [
    "FFFFFF",
    "#fac89e",
    "#e3e891",
    "#c2fc99",
    "#a3fcb3",
    "#92e8d5",
    "#96c8f2",
    "#ada8ff",
    "#ce94f7",
    "#ed94dd",
    "#fea8bb",
  ];

  const [colorIndex, setColorIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 10000); // 

    return () => clearInterval(interval); 
  }, [colors.length]);

  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.8}
          maxSize={1.4}
          particleDensity={150}
          className="w-full h-full"
          particleColor={colors[colorIndex]}
        />
      </div>
      <h1
        className="prose md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20 cursor-pointer"
        onClick={() => router.push("gallery")}
      >
        Next GallerY!
      </h1>
    </div>
  );
};

export default GalleryHero;
