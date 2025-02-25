import { Card } from "../ui/card";
import { Ellipsis } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMemory } from "@/interfaces/memory";
import { deleteMemoryAction } from "@/forms/actions/memory";

interface MemoryProps {
  memory: IMemory;
  isShared?: boolean;
}

const Memory: React.FC<MemoryProps> = ({ memory, isShared }) => {
  return (
    <>
      <Card className="min-w-[calc(50%-1rem)] max-w-[calc(50%-1rem)] max-h-fit hover:shadow-xl transition-all group p-0 overflow-hidden">
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
            {isShared && (
              <DropdownMenu>
                <DropdownMenuTrigger className="h-fit">
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => deleteMemoryAction(memory.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="text-gray-500 mb-4 text-sm text-pretty">
            {memory.description}
          </p>
        </div>
      </Card>
    </>
  );
};

export default Memory;
