"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useUIStore } from "@/store/uiStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Image as ImageLucide } from "lucide-react";

export const MemoryDialog = () => {
  const { ui, setUI } = useUIStore();

  if (!ui) return null;

  return (
    <Dialog
      open={ui.memoryDialog}
      onOpenChange={(open) => setUI({ memoryDialog: open })}
    >
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
              <ImageLucide size={24} />
              <span>Add Photos</span>
            </Button>
            <Button className="w-full mt-4" size="lg">
              Post
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
