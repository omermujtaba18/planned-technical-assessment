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
import { IUser } from "@/interfaces/user";

interface CreateMemoryProps {
  user?: IUser;
}

const CreateMemory: React.FC<CreateMemoryProps> = ({ user: propUser }) => {
  const { setUI } = useUIStore();
  const storeUser = useUserStore((state) => state.user);

  const user = propUser || storeUser;

  if (!user) return null;

  return (
    <section id="create-new-memory" className="mb-10">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <UserAvatar user={user} />
              <h1 className="text-xl font-medium">{`${user.fullName.split(" ")[0]}'s Memory Lane`}</h1>
            </div>
            {!propUser && (
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
            )}
          </div>
          <p className="text-sm text-gray-500 mb-4">
            {user.memoryLaneDescription}
          </p>
          {!propUser && (
            <div className="flex items-start justify-around md:justify-between space-x-4">
              <Button
                variant="secondary"
                size="xl"
                onClick={() => setUI({ shareDialog: { state: true } })}
                id="share-button"
              >
                <Share2 />
                Share
              </Button>
              <Button
                variant="gradient"
                size="xl"
                onClick={() => setUI({ memoryDialog: { state: true } })}
                id="create-memory-button"
              >
                Create Memory
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateMemory;
