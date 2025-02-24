import { create } from "zustand";

interface UI {
  memoryDialog: boolean;
}

interface UserStore {
  ui: UI | null;
  setUI: (ui: UI) => void;
}

export const useUIStore = create<UserStore>((set) => ({
  ui: null,
  setUI: (ui) => set({ ui }),
}));
