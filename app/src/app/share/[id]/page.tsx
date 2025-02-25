"use client";

import CreateMemory from "@/components/home/create-memory";
import MemoryList from "@/components/home/memory-list";
import {
  getShareMemoriesAction,
  getShareUserAction,
} from "@/forms/actions/share";
import { IMemory } from "@/interfaces/memory";
import { IPaging } from "@/interfaces/paging";
import { IUser } from "@/interfaces/user";
import { useEffect, useState } from "react";

export default function ShareMemoryLane({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [user, setUser] = useState<IUser>();
  const [memories, setMemories] = useState<IMemory[]>([]);
  const [paging, setPaging] = useState<IPaging>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const id = (await params).id;
      getShareUserAction(id).then((data) => {
        setUser(data.data);
      });
      getShareMemoriesAction(id).then((response) => {
        const { data, ...paging } = response.data;
        setMemories(data);
        setPaging(paging);
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <CreateMemory user={user} />
      <MemoryList
        memories={memories}
        paging={paging}
        setMemories={setMemories}
        setPaging={setPaging}
      />
    </>
  );
}
