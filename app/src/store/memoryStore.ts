import { IMemory } from "@/interfaces/memory";
import { create } from "zustand";

interface MemoryStore {
  memories: IMemory[];
  setMemories: (memories: IMemory[]) => void;
  createMemory: (memory: IMemory) => void;
  deleteMemory: (id: string) => void;
  editMemory: (memory: IMemory) => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  memories: [],
  setMemories: (memories) => set({ memories }),
  createMemory: (memory) =>
    set((state) => ({ memories: [...state.memories, memory] })),
  deleteMemory: (id) =>
    set((state) => ({
      memories: state.memories.filter((memory) => memory.id !== id),
    })),
  editMemory: (memory) =>
    set((state) => ({
      memories: state.memories.map((m) => (m.id === memory.id ? memory : m)),
    })),
}));
