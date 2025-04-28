import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadImage = async (imageUri: string) =>{
    try{
        if(!imageUri) return null;

        const response = await fetch(imageUri);
        const blob = await response.blob();
        const imageRef = ref(storage, `profile-images/${Date.now()}.jpg`);

        await uploadBytes(imageRef, blob);
        const downloadUrl =  await getDownloadURL(imageRef);

        return downloadUrl;
    } catch(error) {
        console.error("Image upload error:", error);
        return null;
    }
}
