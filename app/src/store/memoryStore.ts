import { create } from "zustand";

interface IMemoryMedia {
  id: string;
  url: string;
}

interface IMemory {
  id: string;
  title: string;
  timestamp: Date;
  description: string;
  media: IMemoryMedia[];
}

interface MemoryStore {
  memories: IMemory[];
  setMemories: (memories: IMemory[]) => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  memories: [],
  setMemories: (memories) => set({ memories }),
}));
