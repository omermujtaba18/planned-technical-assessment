"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const CreateMemory: React.FC = () => {
  const [open, setOpen] = useState(false);

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
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="flex items-start justify-around md:justify-between space-x-4">
            <div className="flex">
              <Button variant="ghost" onClick={() => setOpen(true)}>
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-xl text-green-600"
                />

                <span>Photo</span>
              </Button>
              <Button variant="ghost" onClick={() => setOpen(true)}>
                <FontAwesomeIcon
                  icon={faVideo}
                  className="text-xl text-red-600"
                />
                <span>Video</span>
              </Button>
              <Button variant="ghost" onClick={() => setOpen(true)}>
                <i className="ph ph-bold ph-path text-xl"></i>
                <span>Lane</span>
              </Button>
            </div>
            <Button
              variant="gradient"
              size="xl"
              className="hidden md:flex"
              onClick={() => setOpen(true)}
            >
              Create Memory
            </Button>
          </div>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Create memory</DialogTitle>
            <div className="flex flex-col gap-4">
              <div className="gap-2 flex flex-col">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter your memory title"
                  maxLength={50}
                />
              </div>
              <div className="gap-2 flex flex-col">
                <Label htmlFor="title">Timestamp</Label>
                <Input
                  type="datetime-local"
                  id="title"
                  placeholder="Enter your memory title"
                  defaultValue={new Date().toISOString().slice(0, 16)}
                />
              </div>
              <div className="gap-2 flex flex-col">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter your memory description"
                  rows={5}
                  maxLength={500}
                />
              </div>
              <Button variant="secondary" className="py-10">
                <FontAwesomeIcon icon={faImage} className="text-xl" />
                <span>Add Photos</span>
              </Button>
              <Button className="w-full mt-4" size="lg">
                Post
              </Button>{" "}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreateMemory;
