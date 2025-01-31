import { collection, doc, getDocs } from "firebase/firestore";
import db from "@/firebaseInit";
import {
  CourseDetails,
  LessonDetails,
} from "@/app/service/userProgress/userProgress.types";

interface UserData {
  [courseId: string]: CourseDetails; // An index signature
}
export async function fetchUserProgress(userId: string): Promise<UserData> {
  try {
    const userProgressRef = doc(db, "user-progress", userId);
    const coursesCollectionRef = collection(userProgressRef, "Courses");
    const coursesSnapshot = await getDocs(coursesCollectionRef);
    const userData: UserData = {};

    for (const courseDoc of coursesSnapshot.docs) {
      const courseData = courseDoc.data() as CourseDetails;

      const lessonsCollectionRef = collection(courseDoc.ref, "Lessons");
      const lessonsSnapshot = await getDocs(lessonsCollectionRef);
      const lessonsData: LessonDetails[] = lessonsSnapshot.docs.map(
        (lessonDoc): LessonDetails => {
          const data = lessonDoc.data();
          return {
            lessonId: parseInt(lessonDoc.id, 10),
            completed: data.completed || false,
            lessonName: data.lessonName || "No Name Provided",
            lessonDescription:
              data.lessonDescription || "No Description Available",
          };
        },
      );

      userData[courseDoc.id] = {
        ...courseData,
        lessons: lessonsData,
      };
    }
    return userData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}
