"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLogout } from "./lib/action";

interface NavbarProps {
  session: any | null; // Ensure correct typing for the session prop
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const router = useRouter();

  const handleLogoutClick = async () => {
    await handleLogout();
    router.push("/login");
  };

  console.log("Session in Navbar:", session);

  return (
    <div className="navbar bg-primary-800 z-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Homepage</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
              <li>
                <button onClick={handleLogoutClick}>LogOut</button>
              </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl">
          Next GallerY!
        </Link>
      </div>
      <div className="navbar-end">
        {session ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} role="button" className="btn btn-ghost">
              <span className="text-white">{session.user?.name}!</span>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={handleLogoutClick}>LogOut</button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
