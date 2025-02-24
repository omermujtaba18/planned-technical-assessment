"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUIStore } from "@/store/uiStore";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userStore";

export const ShareDialog = () => {
  const { ui, setUI } = useUIStore();
  const { user } = useUserStore();

  if (!ui) return null;

  return (
    <Dialog
      open={ui?.shareDialog?.state}
      onOpenChange={(open) => setUI({ shareDialog: { state: open } })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Share your memories</DialogTitle>
          <p className="flex flex-row justify-between items-center">
            {`${window.location.origin}/share/${user?.id}`}
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/share/${user?.id}`,
                )
              }
            >
              Copy Link
            </Button>
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
