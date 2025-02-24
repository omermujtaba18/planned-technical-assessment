"use client";

import { useUserStore } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ className }) => {
  const { user } = useUserStore();

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.profilePicture} />
      <AvatarFallback>
        {user?.fullName
          .split(" ")
          .map((name) => name[0])
          .join("")
          .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
