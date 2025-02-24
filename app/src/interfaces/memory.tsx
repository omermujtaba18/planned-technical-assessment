import { IMemoryMedia } from "./memory-media";

export interface IMemory {
  id: string;
  title: string;
  timestamp: Date;
  description: string;
  media: IMemoryMedia[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
