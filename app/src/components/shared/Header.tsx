"use client";

import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBell } from "@fortawesome/free-solid-svg-icons";

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

interface HeaderProps {
  hideNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideNav = false }) => {
  const pathname = usePathname();

  const navs = [
    { href: "/", label: "Home", icon: <FontAwesomeIcon icon={faHouse} /> },
    {
      href: "/memories",
      label: "Memories",
      icon: <i className="ph ph-bold ph-brain text-xl"></i>,
    },
    {
      href: "/lanes",
      label: "Lanes",
      icon: <i className="ph ph-bold ph-path text-xl"></i>,
    },
  ];

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
                <button className="relative text-gray-700 hover:text-indigo-600">
                  <FontAwesomeIcon icon={faBell} className="text-xl" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-700 font-medium hidden md:block">
                      John Doe
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
