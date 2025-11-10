import { collection, getDocs } from "firebase/firestore";
import { Listing } from "./types";
import { db } from "./firebase";

export async function getListings(): Promise<Listing[]> {
  const snapshot = await getDocs(collection(db, "listings"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Listing[];
}
