"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setHeader } from "@/redux/headerSlice";
import { useEffect, useState } from "react";
import {
  addToMindbox,
  removeFromMindbox,
  getMindboxItems,
} from "@/lib/mindboxService";
import { Trash } from "lucide-react";

export default function Page() {
  const dispatch = useAppDispatch();
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const USER_ID = useAppSelector((state) => state.auth.user?.uid) as string;

  // Set header + load tasks
  useEffect(() => {
    dispatch(setHeader(["mindbox"]));

    async function loadTasks() {
      try {
        const items = await getMindboxItems(USER_ID);
        setTasks(items);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }
    }

    loadTasks();
  }, [dispatch]);

  // Handle add task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const task = newTask.trim();

    try {
      await addToMindbox(USER_ID, task);
      setTasks((prev) => [...prev, task]); // optimistic update
      setNewTask("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // Handle remove task
  const handleRemove = async (task: string) => {
    try {
      await removeFromMindbox(USER_ID, task);
      setTasks((prev) => prev.filter((t) => t !== task));
    } catch (err) {
      console.error("Failed to remove task:", err);
    }
  };

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Mindbox</h1>

      {/* Task form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 pb-5">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="border px-3 py-1 rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Task list */}
      <div className="flex flex-wrap gap-2">
        {tasks.map((task, idx) => (
          <TaskItem key={idx} task={task} onRemove={() => handleRemove(task)} />
        ))}
      </div>
    </main>
  );
}

// Task item component
function TaskItem({ task, onRemove }: { task: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-2 px-3 py-1 rounded-2xl border text-sm transition">
      {task}
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 text-xs"
      >
        <Trash className="w-4 h-4"></Trash>
      </button>
    </span>
  );
}
