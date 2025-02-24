"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import { UserAvatar } from "../shared/user-avatar";
import { Ellipsis, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const CreateMemory: React.FC = () => {
  const { setUI } = useUIStore();
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <section id="create-new-memory" className="mb-10">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <UserAvatar />
              <h1 className="text-xl font-medium">{`${user.fullName.split(" ")[0]}'s Memory Lane`}</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-fit">
                <Ellipsis className="justify-self-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Ellipsis /> */}
          </div>
          <p className="text-sm text-gray-500 mb-4">
            {user.memoryLaneDescription}
          </p>
          <div className="flex items-start justify-around md:justify-between space-x-4">
            <Button variant="secondary" size="xl">
              <Share2 />
              Share
            </Button>
            <Button
              variant="gradient"
              size="xl"
              onClick={() => setUI({ memoryDialog: { state: true } })}
            >
              Create Memory
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateMemory;
