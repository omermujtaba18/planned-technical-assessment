"use client";

import CreateMemory from "@/components/home/create-memory";
import MemoryList from "@/components/home/memory-list";
import { getShareAction } from "@/forms/actions/share";
import { IMemory } from "@/interfaces/memory";
import { IUser } from "@/interfaces/user";
import { useEffect, useState } from "react";

export default function ShareMemoryLane({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [user, setUser] = useState<IUser>();
  const [memories, setMemories] = useState<IMemory[]>();

  useEffect(() => {
    const fetchData = async () => {
      const id = (await params).id;
      getShareAction(id).then((data) => {
        setUser(data.data);
        setMemories(data.data.memories);
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <CreateMemory user={user} />
      <MemoryList memories={memories} />
    </>
  );
}
