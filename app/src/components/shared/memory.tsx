import { Card } from "../ui/card";
import { Ellipsis, Route, Share2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMemory } from "@/interfaces/memory";

interface MemoryProps {
  memory: IMemory;
}

const Memory: React.FC<MemoryProps> = ({ memory }) => {
  return (
    <Card className="flex-1 max-w-[calc(33.33%-1rem)] hover:shadow-xl transition-all group p-0 overflow-hidden">
      <div className="relative">
        <Carousel
          plugins={[Autoplay({ delay: 5000 })]}
          className="h-48 overflow-hidden"
        >
          <CarouselContent>
            {memory.media.map((media, index) => (
              <CarouselItem key={`media-${index}`}>
                <Image
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  src={media.url}
                  alt="memory media"
                  width={100}
                  height={100}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-indigo-600 p-2 rounded-full hover:bg-opacity-90 transition-all"
          >
            <Route className="text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-indigo-600 rounded-full hover:bg-opacity-90 transition-all"
          >
            <Share2 className="text-white" />{" "}
          </Button>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-start space-x-3 justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">{memory.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(memory.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="h-fit">
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-gray-600 mb-4 text-sm text-pretty">
          {memory.description.length > 100
            ? `${memory.description.slice(0, 100)}...`
            : memory.description}
        </p>
      </div>
    </Card>
  );
};

export default Memory;
