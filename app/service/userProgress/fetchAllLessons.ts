import { collectionGroup, getDocs } from "firebase/firestore";
import db from "@/firebaseInit";
// If you're using Timestamp directly in components, ensure it's imported. Otherwise, adjust the type as needed.
import firebase from "firebase/compat/app"; // or "firebase/app" based on your setup

interface Lesson {
  completed: boolean;
  dateCompleted: firebase.firestore.Timestamp; // Or Date, if you're converting it
  id: string;
  lessonId: number;
  lessonName: string;
}

export async function fetchAllLessons(): Promise<Lesson[]> {
  try {
    const querySnapshot = await getDocs(collectionGroup(db, "Lessons"));
    let lessonsArray: Lesson[] = []; // Typed as an array of Lesson

    querySnapshot.forEach((doc) => {
      // Ensure the object matches the Lesson interface
      const lesson: Lesson = {
        id: doc.id,
        ...(doc.data() as Omit<Lesson, "id">),
      };
      lessonsArray.push(lesson);
    });

    if (querySnapshot.empty) {
      console.log("No lessons found.");
    } else {
      console.log("Fetched lessons:", lessonsArray);
    }

    return lessonsArray; // Return the typed array of lessons
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return []; // Return an empty array in case of error
  }
}
