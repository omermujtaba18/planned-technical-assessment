import React from "react";
import { useMemoryStore } from "@/store/memoryStore";
import Memory from "../shared/memory";

const MemoryList: React.FC = () => {
  const { memories } = useMemoryStore();

  if (memories.length === 0) return;

  return (
    <section id="memory-list">
      <div className="flex flex-row flex-wrap gap-4">
        {memories.map((memory, index) => (
          <Memory key={`memory-${index}`} memory={memory} />
        ))}
      </div>
    </section>
  );
};

export default MemoryList;
