import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase"; // your Firebase config
import { User } from "firebase/auth";


export async function ensureCurrentUserDoc() {
  const user: User | null = auth.currentUser;

  if (!user) throw new Error("No authenticated user found");

  const uid = user.uid;
  const userRef = doc(db, "users", uid);

  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      email: user.email || "",
      displayName: user.displayName || "",
      createdAt: Timestamp.now(),
      completedPaths: 0,
    });
    console.log(`User document created for UID: ${uid}`);
  } else {
    console.log(`User document already exists for UID: ${uid}`);
  }
}
