"use client";

import CreateMemory from "@/components/home/create-memory";
import { EmptyState } from "@/components/home/empty-state";
import MemoryList from "@/components/home/memory-list";
import { useMemoryStore } from "@/store/memoryStore";

export default function Home() {
  const { memories } = useMemoryStore();

  if (memories.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <CreateMemory />
      <MemoryList />
    </>
  );
}
