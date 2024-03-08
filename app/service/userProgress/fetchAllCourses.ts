import { collectionGroup, getDocs } from "firebase/firestore";
import db from "@/firebaseInit";
import { CourseDetails } from "@/app/service/userProgress/userProgress.types"; // Adjust this to your actual import path

export async function fetchAllCourses(): Promise<CourseDetails[]> {
  try {
    const querySnapshot = await getDocs(collectionGroup(db, "Courses"));
    let coursesArray: CourseDetails[] = [];

    querySnapshot.forEach((doc) => {
      // Assuming doc.data() might have its own 'courseId', we explicitly overwrite it with doc.id after spreading.
      const data = doc.data() as Omit<CourseDetails, "courseId">;
      const course: CourseDetails = {
        ...data,
        courseId: doc.id, // Ensuring this assignment takes precedence
      };
      coursesArray.push(course);
    });

    // Directly return coursesArray, empty or not.
    return coursesArray;
  } catch (error) {
    console.error("Error fetching courses:", error);
    // In case of an error, an empty array is returned to match the expected return type.
    return [];
  }
}
