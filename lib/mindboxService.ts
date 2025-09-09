// mindboxService.ts
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
} from "firebase/firestore";

const db = getFirestore();

export async function addToMindbox(userId: string, value: string) {
  try {
    const ref = doc(db, "mindbox", userId);

    // Ensure doc exists before updating (create once if missing)
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, { items: [] }); // create doc only once
    }

    await updateDoc(ref, {
      items: arrayUnion(value),
    });
    console.log(`Added "${value}" to ${userId}'s mindbox`);
  } catch (error) {
    console.error("Error adding to mindbox:", error);
    throw error;
  }
}

// Get list of elements in the array field
export async function getMindboxItems(userId: string): Promise<string[]> {
  try {
    const ref = doc(db, "mindbox", userId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      return data.items || [];
    } else {
      // Create once, but don’t overwrite later
      await setDoc(ref, { items: [] });
      console.log(`Created new mindbox for user: ${userId}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching mindbox items:", error);
    throw error;
  }
}

export async function removeFromMindbox(userId: string, value: string) {
  try {
    const ref = doc(db, "mindbox", userId);

    await updateDoc(ref, {
      items: arrayRemove(value),
    });
    console.log(`Removed "${value}" from ${userId}'s mindbox`);
  } catch (error) {
    console.error("Error removing from mindbox:", error);
    throw error;
  }
}
