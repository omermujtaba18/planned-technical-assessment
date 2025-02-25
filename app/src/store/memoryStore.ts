import { IMemory } from "@/interfaces/memory";
import { IPaging } from "@/interfaces/paging";
import { create } from "zustand";

interface MemoryStore {
  memories: IMemory[];
  paging: IPaging;
  setPaging: (paging: IPaging) => void;
  addMemories: (memories: IMemory[]) => void;
  createMemory: (memory: IMemory) => void;
  deleteMemory: (id: string) => void;
  editMemory: (memory: IMemory) => void;
  resetMemories: () => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  memories: [],
  paging: { totalItems: 0, totalPages: 0, currentPage: 0 },
  setPaging: (paging) => set({ paging }),
  addMemories: (memories) =>
    set((state) => ({ memories: [...state.memories, ...memories] })),
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
  resetMemories: () =>
    set({
      memories: [],
      paging: { totalItems: 0, totalPages: 0, currentPage: 0 },
    }),
}));
