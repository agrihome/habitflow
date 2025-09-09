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

// Add an element to the array field
export async function addToMindbox(userId: string, value: string) {
  try {
    const ref = doc(db, "mindbox", userId);

    // Ensure doc exists before updating
    await setDoc(ref, { items: [] }, { merge: true });

    await updateDoc(ref, {
      items: arrayUnion(value),
    });
    console.log(`Added "${value}" to ${userId}'s mindbox`);
  } catch (error) {
    console.error("Error adding to mindbox:", error);
    throw error;
  }
}

// Remove an element from the array field
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

// Get list of elements in the array field
// If no mindbox exists, create one with an empty array
export async function getMindboxItems(userId: string): Promise<string[]> {
  try {
    const ref = doc(db, "mindbox", userId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      return data.items || [];
    } else {
      // Create the mindbox doc with an empty array
      await setDoc(ref, { items: [] });
      console.log(`Created new mindbox for user: ${userId}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching mindbox items:", error);
    throw error;
  }
}
