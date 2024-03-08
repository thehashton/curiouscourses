import db from "@/firebaseInit"; // Adjust with your actual import path
import { collection, getDocs } from "firebase/firestore";

export const fetchAllUserProgress = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "user-progress"));
    const allUserProgress: any[] = []; // Array to store all user progress data

    if (querySnapshot.empty) {
      console.log("No documents found in 'user-progress' collection.");
    } else {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data()); // Log each document's ID and data
        allUserProgress.push({ id: doc.id, ...doc.data() }); // Add to array
      });

      // Log the collected array
      console.log(allUserProgress);
    }

    return allUserProgress;
  } catch (error) {
    console.error("Error fetching user progress:", error);
  }
};
