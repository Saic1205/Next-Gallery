"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { SparklesCore } from "../components/ui/sparkles";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    toast("Welcome to the Login page");
  }, []);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user } = await response.json();
        toast.success("Login successful");
        toast(`Welcome ${user.name}`);
        router.push("/gallery");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Error during login");
    }
  };

  return (
    <div className="relative min-h-screen bg-base-200">
      <SparklesCore
        background="#000"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={1000}
        className="absolute inset-0 w-full h-full"
        particleColor="#FFFFFF"
      />
      <div className="hero min-h-screen relative z-10 flex items-center justify-center">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100/50 ">
          <div className="card-body ">
            <h1 className="text-4xl font-bold text-center mb-6">Login now!</h1>
            <form onSubmit={handleSignIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                  required
                />
                <label className="label mt-2">
                  <Link
                    href="./signup"
                    className="label-text-alt link link-hover"
                  >
                    Not a user? Register here
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary btn-outline" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
