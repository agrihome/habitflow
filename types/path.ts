import { Timestamp } from "firebase/firestore";


export interface Path {
  id: string; // Firestore doc ID
  name: string; // Unique within user
  description: string;
  created: Timestamp;
  updated: Timestamp; // Last update timestamp
  completed: boolean;
  status: "active" | "archived" | "draft";
  taskCount: number;
  lastUsed: Timestamp;
}
