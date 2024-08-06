"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SparklesCore } from "../components/ui/sparkles";
import Link from "next/link";
import { signupSchema } from "./zSchema"; 


interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  useEffect(() => {
    toast("Welcome to the signup page");
  }, []);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationResult = signupSchema.safeParse({ name, email, password, confirmPassword });

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.reduce((acc: Errors, error) => {
        if (error.path.length > 0) {
          const field = error.path[0] as keyof Errors;
          acc[field] = error.message;
        }
        return acc;
      }, {});
      setErrors(errorMessages);
      return;
    }

    setErrors({}); 

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Signup successful");
        router.push("/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-base-200">
      <SparklesCore
        background="#000"
        minSize={0.1}
        maxSize={0.2}
        particleDensity={1}
        className="absolute inset-0 w-full h-full"
        particleColor="#FFFFFF"
      />
      <div className="hero min-h-screen relative z-1 flex items-center justify-center">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100/50 ">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-6">Sign up now!</h1>
            <form onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && <span className="text-error text-sm">{errors.name}</span>}
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`input input-bordered ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <span className="text-error text-sm">{errors.email}</span>}
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`input input-bordered ${errors.password ? "input-error" : ""}`}
                />
                {errors.password && <span className="text-error text-sm">{errors.password}</span>}
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`input input-bordered ${errors.confirmPassword ? "input-error" : ""}`}
                />
                {errors.confirmPassword && <span className="text-error text-sm">{errors.confirmPassword}</span>}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary btn-outline" type="submit">
                  Sign up
                </button>
              </div>
              <label className="label mt-2">
                <span className="label-text-alt">
                  Already have an account?{" "}
                  <Link href="/login" className="link link-hover">
                    Login here
                  </Link>
                </span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
