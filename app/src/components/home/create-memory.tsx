"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/uiStore";
import { Image as ImageLucide, Route, Video } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { UserAvatar } from "../shared/user-avatar";

const CreateMemory: React.FC = () => {
  const { setUI } = useUIStore();
  const { user } = useUserStore();

  if (!user) return null;

  const openMemoryDialog = () => setUI({ memoryDialog: { state: true } });

  const buttons = [
    {
      icon: <ImageLucide className="text-xl text-green-600" />,
      label: "Photo",
    },
    { icon: <Video className="text-xl text-red-600" />, label: "Video" },
    { icon: <Route />, label: "Lane" },
  ];

  return (
    <section id="create-new-memory" className="mb-10">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start space-x-4 ">
            <UserAvatar />
            <Input
              placeholder="Share your memories..."
              onClick={openMemoryDialog}
            />
          </div>
          <div className="flex items-start justify-around md:justify-between space-x-4">
            <div className="flex">
              {buttons.map((button, index) => (
                <Button key={index} variant="ghost" onClick={openMemoryDialog}>
                  {button.icon}
                  <span>{button.label}</span>
                </Button>
              ))}
            </div>
            <Button
              variant="gradient"
              size="xl"
              className="hidden md:flex"
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
