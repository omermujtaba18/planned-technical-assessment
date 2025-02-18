import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { FaImage, FaPlus, FaVideo } from "react-icons/fa6";
import { PiPathBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateMemory: React.FC = () => {
  return (
    <section id="create-new-memory">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start space-x-4 ">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Input placeholder="Share your memories..." />
          </div>
          <div className="flex items-start justify-around md:justify-between space-x-4">
            <div className="flex">
              <Button variant="ghost">
                <FaImage className="text-xl text-green-600" />
                <span>Photo</span>
              </Button>
              <Button variant="ghost">
                <FaVideo className="text-xl text-red-600" />
                <span>Video</span>
              </Button>
              <Button variant="ghost">
                <PiPathBold className="text-xl text-indigo-600" />
                <span>Lane</span>
              </Button>
            </div>
            <Button variant="gradient" size="xl" className="hidden md:flex">
              <FaPlus />
              Create Memory
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateMemory;
