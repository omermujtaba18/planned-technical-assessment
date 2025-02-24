"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/uiStore";

const CreateMemory: React.FC = () => {
  const { setUI } = useUIStore();

  return (
    <section id="create-new-memory" className="mb-10">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start space-x-4 ">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Input
              placeholder="Share your memories..."
              onClick={() => setUI({ memoryDialog: true })}
            />
          </div>
          <div className="flex items-start justify-around md:justify-between space-x-4">
            <div className="flex">
              <Button
                variant="ghost"
                onClick={() => setUI({ memoryDialog: true })}
              >
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-xl text-green-600"
                />

                <span>Photo</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setUI({ memoryDialog: true })}
              >
                <FontAwesomeIcon
                  icon={faVideo}
                  className="text-xl text-red-600"
                />
                <span>Video</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setUI({ memoryDialog: true })}
              >
                <i className="ph ph-bold ph-path text-xl"></i>
                <span>Lane</span>
              </Button>
            </div>
            <Button
              variant="gradient"
              size="xl"
              className="hidden md:flex"
              onClick={() => setUI({ memoryDialog: true })}
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
