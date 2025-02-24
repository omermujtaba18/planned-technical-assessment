import Image from "next/image";
import { Button } from "../ui/button";
import { Route, Video, Image as ImageLucide, Share2 } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export const EmptyState: React.FC = () => {
  const { setUI } = useUIStore();

  const openMemoryDialog = () => setUI({ memoryDialog: { state: true } });

  const buttons = [
    {
      icon: <ImageLucide className="text-green-600" />,
      text: "Upload Photo",
    },
    {
      icon: <Route />,
      text: "Create Memory Lanes",
    },
    {
      icon: <Video className="text-red-600" />,
      text: "Share Videos",
    },
  ];

  const tips = [
    {
      icon: <ImageLucide className="text-green-600" />,
      text: "Capture special moments with photos and videos",
    },
    {
      icon: <Share2 className="text-blue-600" />,
      text: "Share with friends and family",
    },
    {
      icon: <Route />,
      text: "Create memory lanes to organize your memories",
    },
  ];

  return (
    <section
      id="home-empty-state"
      className="flex flex-col items-center justify-center text-center h-full my-8 gap-6"
    >
      <Image
        src="/images/memory-empty-state.jpg"
        width="400"
        height="400"
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
        onClick={() => setUI({ memoryDialog: { state: true } })}
      >
        Create your first memory
      </Button>

      <div className="flex gap-4">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant="outline"
            className="py-5"
            onClick={openMemoryDialog}
          >
            {button.icon}
            {button.text}
          </Button>
        ))}
      </div>

      <div className="bg-purple-100 rounded-lg p-8 flex flex-col gap-8 mt-4 max-w-3xl">
        <h3 className="text-xl font-bold">Quick Tips To Get Started</h3>
        <div className="flex gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="flex flex-col items-center leading-tight gap-4"
            >
              {tip.icon}
              <p className="text-gray-600">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
