import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  startAfter,
  limit,
  where,
  DocumentData,
  QueryDocumentSnapshot,
  QueryConstraint,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getCollectionPath } from "@/lib/getCollectionPath";
import { CollectionKey } from "@/lib/firestorePaths";


export async function addDocument<T extends DocumentData>(
  key: CollectionKey,
  data: Omit<T, "id" | "created" | "updated">
): Promise<string> {
  const ref = collection(db, getCollectionPath(key));
  const timestamp = Timestamp.now();

  const docRef = await addDoc(ref, {
    ...data,
    created: timestamp,
    updated: timestamp,
  });

  return docRef.id;
}

export async function getDocuments<T extends DocumentData>(
  key: CollectionKey
): Promise<T[]> {
  const ref = collection(db, getCollectionPath(key));
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as T));
}

export async function getDocumentById<T extends DocumentData>(
  key: CollectionKey,
  id: string
): Promise<T | null> {
  const docRef = doc(db, getCollectionPath(key), id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists()
    ? ({ id: snapshot.id, ...snapshot.data() } as unknown as T)
    : null;
}

export async function updateDocument<T extends DocumentData>(
  key: CollectionKey,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, getCollectionPath(key), id);
  await updateDoc(docRef, { ...data, updated: Timestamp.now() });
}

export async function deleteDocument(
  key: CollectionKey,
  id: string
): Promise<void> {
  const docRef = doc(db, getCollectionPath(key), id);
  await deleteDoc(docRef);
}

export async function getPaginatedDocuments<T extends DocumentData>(
  key: CollectionKey,
  pageSize: number,
  lastVisible?: QueryDocumentSnapshot<T>
): Promise<{ data: T[]; lastDoc?: QueryDocumentSnapshot<T> }> {
  const ref = collection(db, getCollectionPath(key));
  const q = lastVisible
    ? query(
        ref,
        orderBy("created", "desc"),
        startAfter(lastVisible),
        limit(pageSize)
      )
    : query(ref, orderBy("created", "desc"), limit(pageSize));

  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as T));
  const lastDoc = snapshot.docs[snapshot.docs.length - 1] as
    | QueryDocumentSnapshot<T>
    | undefined;

  return { data: docs, lastDoc };
}

