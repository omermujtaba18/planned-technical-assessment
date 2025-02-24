"use client";

import Link from "next/link";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/forms/actions/auth";
import { getUserAction } from "@/forms/actions/user";
import { useUserStore } from "@/store/userStore";
import { Brain, House, Route } from "lucide-react";

interface HeaderProps {
  hideNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideNav = false }) => {
  const pathname = usePathname();
  const { user } = useUserStore();

  const navs = [
    { href: "/", label: "Home", icon: <House /> },
    {
      href: "/memories",
      label: "Memories",
      icon: <Brain />,
    },
    {
      href: "/lanes",
      label: "Lanes",
      icon: <Route />,
    },
  ];

  useEffect(() => {
    if (!hideNav && !user) {
      getUserAction();
    }
  });

  return (
    <header
      id="header"
      className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-indigo-100"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            MemoryLane
          </h1>

          {!hideNav && (
            <>
              <nav className="hidden md:flex space-x-2">
                {navs.map((nav, index) => (
                  <Link
                    className={`text-gray-700 hover:text-indigo-600 cursor-pointer flex items-center space-x-2 py-2 px-4 ${
                      pathname === nav.href
                        ? "bg-purple-100 rounded-lg text-indigo-600 font-semibold"
                        : ""
                    }`}
                    href={nav.href}
                    key={`nav-${index}`}
                  >
                    {nav.icon}
                    <span>{nav.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="flex items-center space-x-6">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={user?.profilePicture} />
                      <AvatarFallback>
                        {user?.fullName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .toUpperCase()}{" "}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-gray-700 font-medium hidden md:block">
                      {user?.fullName}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logoutAction()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
