import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImage(file: File, folder: string) {
  const imageRef = ref(storage, `${folder}/${file.name}`);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}
