import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Path } from "@/types/path";

const getPathRef = (userId: string) => collection(db, `users/${userId}/paths`);

export async function addPath(
  userId: string,
  path: Omit<Path, "id" | "created" | "updated" | "lastUsed">
): Promise<Path> {
  const q = query(getPathRef(userId), where("name", "==", path.name));
  const snapshot = await getDocs(q);
  if (!snapshot.empty)
    throw new Error(`Path with name "${path.name}" already exists.`);

  const timestamp = Timestamp.now();
  const docRef = await addDoc(getPathRef(userId), {
    ...path,
    created: timestamp,
    updated: timestamp,
    lastUsed: timestamp,
  });

  const newDoc = await getDoc(docRef);

  return {
    id: newDoc.id,
    ...(newDoc.data() as Omit<Path, "id">),
  } as Path;
}

export async function getPaths(userId: string): Promise<Path[]> {
  const snapshot = await getDocs(getPathRef(userId));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Path));
}

export async function updatePath(
  userId: string,
  pathId: string,
  data: Partial<Path>
) {
  const docRef = doc(db, `users/${userId}/paths/${pathId}`);
  await updateDoc(docRef, { ...data, updated: Timestamp.now() });
}

export async function deletePath(userId: string, pathId: string) {
  const docRef = doc(db, `users/${userId}/paths/${pathId}`);
  await deleteDoc(docRef);
}
