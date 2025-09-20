export type Task = {
  taskId: string;
  taskName: string;
  description: string;
  type: string;
  pathId: string;
  milestoneId: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed" | "Blocked";
  originalCompletionDate: string;
  actualCompletionDate: string;
  postponedCount: number;
  isPostponed: boolean;
  createdAt: string;
  updatedAt: string;
};
