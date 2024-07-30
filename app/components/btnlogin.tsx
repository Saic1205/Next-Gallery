"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Btnlogin = () => {
  const router = useRouter();
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => router.push("login")}
      >
        Get Started
      </button>
    </>
  );
};

export default Btnlogin;
