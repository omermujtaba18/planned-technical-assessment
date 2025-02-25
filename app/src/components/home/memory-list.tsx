import React from "react";
import { useMemoryStore } from "@/store/memoryStore";
import Memory from "../shared/memory";
import { Button } from "../ui/button";
import { getMemoriesAction } from "@/forms/actions/memory";
import { IMemory } from "@/interfaces/memory";
import MonthSeparator from "./month-separator";
import { IPaging } from "@/interfaces/paging";
import { getShareMemoriesAction } from "@/forms/actions/share";
import { getLocateYear } from "@/lib/utils";

interface MemoryListProps {
  memories?: IMemory[];
  paging?: IPaging;
  setMemories?: (memories: IMemory[]) => void;
  setPaging?: (paging: IPaging) => void;
}

const MemoryList: React.FC<MemoryListProps> = ({
  memories: propMemories,
  paging: propPaging,
  setMemories,
  setPaging,
}) => {
  console.log(propPaging);

  const storeMemories = useMemoryStore((state) => state.memories);
  const storePaging = useMemoryStore((state) => state.paging);

  const memories = propMemories || storeMemories;
  const paging = propPaging || storePaging;

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
              <MonthSeparator year={`${getLocateYear(month)}`} />
              <div className="flex flex-row flex-wrap gap-4">
                {memories.map((memory, index) => (
                  <Memory key={`memory-${index}`} memory={memory} />
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      {paging.currentPage !== paging.totalPages && (
        <div className="flex items-center justify-center">
          <Button
            variant="secondary"
            className="w-full"
            disabled={paging.currentPage === paging.totalPages}
            onClick={() => {
              if (!!propMemories && !!setMemories && !!setPaging) {
                getShareMemoriesAction(
                  memories[0].userId,
                  paging.currentPage + 1,
                ).then((response) => {
                  const { data, ...paging } = response.data;
                  setMemories([...memories, ...data]);
                  setPaging(paging);
                });
              } else {
                getMemoriesAction(paging.currentPage + 1);
              }
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};

export default MemoryList;
