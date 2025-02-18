import Link from "next/link";
import React from "react";
import { FaHouse, FaRegBell } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
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
          <nav className="hidden md:flex space-x-6">
            <Link
              className="text-gray-700 hover:text-indigo-600 cursor-pointer flex items-center space-x-2"
              href="#"
            >
              <FaHouse />
              <span>Home</span>
            </Link>
          </nav>
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-700 hover:text-indigo-600">
              <FaRegBell className="text-xl" />
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
