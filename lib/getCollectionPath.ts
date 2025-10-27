// lib/getCollectionPath.ts
import { COLLECTION_PATHS, CollectionKey } from "./firestorePaths";
import { store } from "@/redux/store"; 

export function getCollectionPath(key: CollectionKey): string {
  let userId: string | undefined;

  try {
    const state = store.getState();
    userId = state.auth?.user?.uid;
  } catch {
    throw new Error("Redux store not initialized or accessible.");
  }

  if (!userId) {
    throw new Error("User ID not found in Redux store.");
  }

  if (key === "users") return COLLECTION_PATHS.users;

  return `users/${userId}/${COLLECTION_PATHS[key]}`;
}
