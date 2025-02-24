import Image from "next/image";
import { Button } from "../ui/button";
import { Route, Video, Image as ImageLucide, Share2 } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export const EmptyState: React.FC = () => {
  const { setUI } = useUIStore();

  return (
    <section
      id="home-empty-state"
      className="flex flex-col items-center justify-center text-center h-full my-8 gap-6"
    >
      <Image
        src="/images/memory-empty-state.jpg"
        width="100"
        height="100"
        className="border-8 bg-white rounded-lg shadow-lg border-white min-w-96"
        alt="empty state"
        priority={true}
        quality={100}
        loading="eager"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-extrabold">Begin your Memory Journey</h1>
        <p className="text-gray-600">
          Create your first memory and start building your personal timeline of
          cherished moments. <br />
          Share photos, videos, and stories that matter most to you.
        </p>
      </div>
      <Button
        variant="gradient"
        size="xl"
        className="py-3 text-lg"
        onClick={() => setUI({ memoryDialog: true })}
      >
        Create your first memory
      </Button>

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="py-5"
          onClick={() => setUI({ memoryDialog: true })}
        >
          <ImageLucide className="text-green-600" />
          Upload Photo
        </Button>
        <Button
          variant="outline"
          className="py-5"
          onClick={() => setUI({ memoryDialog: true })}
        >
          <Route />
          Create Memory Lanes
        </Button>
        <Button
          variant="outline"
          className="py-5"
          onClick={() => setUI({ memoryDialog: true })}
        >
          <Video className="text-red-600" /> Share Videos
        </Button>
      </div>

      <div className="bg-purple-100 rounded-lg p-8 flex flex-col gap-8 mt-4 max-w-3xl">
        <h3 className="text-xl font-bold">Quick Tips To Get Started</h3>
        <div className="flex gap-8">
          <div className="flex flex-col items-center leading-tight gap-4">
            <ImageLucide className="text-green-600 size-6" />
            <p>Capture special moments with photos and videos</p>
          </div>
          <div className="flex flex-col items-center leading-tight gap-4">
            <Share2 className="text-blue-600 size-6" />
            <p>Share with friends and family</p>
          </div>
          <div className="flex flex-col items-center leading-tight gap-4">
            <Route className="size-6" />
            <p>Create memory lanes to organize your memories</p>
          </div>
        </div>
      </div>
    </section>
  );
};
