import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MemoryList: React.FC = () => {
  const memories = [
    {
      id: 1,
      title: "Summer Vacation 2025",
      description:
        "Our amazing family trip to Maldives with unforgettable moments. 🌊☀️ #FamilyTime #Vacation",
      timestamp: "March 12, 2025",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/d438c7454b-ee93370a997fa353ed48.png",
    },
    {
      id: 2,
      title: "Summer Vacation 2025",
      description:
        "Our amazing family trip to Maldives with unforgettable moments. 🌊☀️ #FamilyTime #Vacation",
      timestamp: "March 12, 2025",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/d438c7454b-ee93370a997fa353ed48.png",
    },
    {
      id: 3,
      title: "Summer Vacation 2025",
      description:
        "Our amazing family trip to Maldives with unforgettable moments. 🌊☀️ #FamilyTime #Vacation",
      timestamp: "March 12, 2025",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/d438c7454b-ee93370a997fa353ed48.png",
    },
  ];

  return (
    <section id="memory-list">
      <div className="flex flex-row flex-wrap gap-4">
        {memories.map((memory, index) => (
          <Card
            key={`memory-${index}`}
            className="flex-1 min-w-[calc(33.33%-1rem)] hover:shadow-xl transition-all group p-0 overflow-hidden"
          >
            <div className="relative">
              <div className="h-48 overflow-hidden">
                <Image
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  src={memory.image}
                  alt="family vacation"
                  width={100}
                  height={100}
                />
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-indigo-600 p-2 rounded-full hover:bg-opacity-90 transition-all"
                >
                  <i className="ph ph-bold ph-path text-white"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-indigo-600 rounded-full hover:bg-opacity-90 transition-all"
                >
                  <i className="ph ph-share-network text-white"></i>
                </Button>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-start space-x-3 justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {memory.title}
                  </h3>
                  <p className="text-sm text-gray-500">{memory.timestamp}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-fit">
                    <i className="ph ph-dots-three-outline"></i>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{memory.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MemoryList;
