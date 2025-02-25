"use client";

import { useUserStore } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/interfaces/user";

interface UserAvatarProps {
  className?: string;
  user?: IUser;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  className,
  user: propUser,
}) => {
  const storeUser = useUserStore((state) => state.user);
  const user = propUser || storeUser;

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
