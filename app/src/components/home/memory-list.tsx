import React from "react";
import { useMemoryStore } from "@/store/memoryStore";
import Memory from "../shared/memory";
import { Button } from "../ui/button";
import { getMemoriesAction } from "@/forms/actions/memory";
import { IMemory } from "@/interfaces/memory";
import MonthSeparator from "./month-separator";

const MemoryList: React.FC = () => {
  const { memories, paging } = useMemoryStore();

  function groupMemoriesByMonth(
    memories: IMemory[],
  ): Record<string, IMemory[]> {
    return memories.reduce(
      (acc, memory) => {
        const monthKey = new Date(memory.timestamp).toISOString().slice(0, 7);
        if (!acc[monthKey]) {
          acc[monthKey] = [];
        }
        acc[monthKey].push(memory);
        return acc;
      },
      {} as Record<string, IMemory[]>,
    );
  }

  return (
    <section id="memory-list" className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {Object.entries(groupMemoriesByMonth(memories)).map(
          ([month, memories]) => (
            <div key={month} className="flex flex-col gap-4">
              <MonthSeparator
                year={`${new Date(`${month}-01`).toLocaleDateString("en-CA", {
                  month: "long",
                  year: "numeric",
                })}`}
              />
              <div className="flex flex-row flex-wrap gap-4">
                {memories.map((memory, index) => (
                  <Memory key={`memory-${index}`} memory={memory} />
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      <div className="flex items-center justify-center">
        <Button
          variant="secondary"
          className="w-full"
          disabled={paging.currentPage === paging.totalPages}
          onClick={() => {
            getMemoriesAction(paging.currentPage + 1);
          }}
        >
          Load More
        </Button>
      </div>
    </section>
  );
};

export default MemoryList;
