import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import axios from "axios";
import type { Listing } from "@/lib/types";

export async function getListings(): Promise<Listing[]> {
  const snapshot = await getDocs(collection(db, "listings"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Listing[];
}

export const uploadListingImages = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    urls.push(response.data.secure_url );
  }
  
  return urls;
};

export async function createListing(data: Listing) {
  const listingsRef = collection(db, "listings");
  const payload = {
    ...data,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  };

  const docRef = await addDoc(listingsRef, payload);
  return docRef.id;
}


/* 

{
    "asset_id": "83c9594e61c5f7ca16599418a8eaeb0a",
    "public_id": "pryzgfyvbhugzgwgkoii",
    "version": 1762805251,
    "version_id": "92778a77a0bb602b33f96ecb125c2f06",
    "signature": "ad7350702edf64ef0de99ae4c9b0a0315664e9fb",
    "width": 983,
    "height": 801,
    "format": "png",
    "resource_type": "image",
    "created_at": "2025-11-10T20:07:31Z",
    "tags": [],
    "bytes": 1303067,
    "type": "upload",
    "etag": "7974f65e3d7813230bafb2ffcf9c80e2",
    "placeholder": false,
    "url": "http://res.cloudinary.com/dwvt63sbv/image/upload/v1762805251/pryzgfyvbhugzgwgkoii.png",
    "secure_url": "https://res.cloudinary.com/dwvt63sbv/image/upload/v1762805251/pryzgfyvbhugzgwgkoii.png",
    "asset_folder": "",
    "display_name": "front",
    "original_filename": "front"

*/