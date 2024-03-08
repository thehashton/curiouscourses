import { doc, getDoc, getFirestore } from "firebase/firestore";
import {
  CourseDetails,
  UserCourseProgress,
} from "@/app/service/userProgress/userProgress.types"; // Import from "firebase/firestore" if using Firebase Web SDK

const db = getFirestore(); // Initialize Firestore, adjust according to your Firebase setup

export async function getUserProgress(
  userId: string,
): Promise<UserCourseProgress[]> {
  const userCourses: UserCourseProgress[] = [];

  // Reference to the user's document in the "user-progress" collection
  const userDocRef = doc(db, "user-progress", userId);

  try {
    // Fetch the user's courses; adjust this based on your actual data structure
    // This example assumes you have a direct way to get course details; you might need to adjust it to fit your Firestore data model
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      console.log("No user progress found.");
      return userCourses;
    }

    const userData = userDocSnap.data();
    // Assuming userData contains a field or way to enumerate courses, e.g., an array of courseIds
    // You would need to fetch each course's details, possibly from another collection/document
    // This part of the implementation depends heavily on how your Firestore is structured

    // For simplicity, let's assume it's an array of courseIds stored in the userData
    for (const courseId of userData.courseIds) {
      // Fetch course details here, adjust to your structure
      // This is a placeholder; actual implementation will vary
      const courseDetails: CourseDetails = {
        courseId: courseId,
        courseName: "Sample Course",
        lessonTotal: 10,
      };
      // You might fetch lessons for each course similarly

      // Append to userCourses array
      userCourses.push({
        courseId: courseDetails.courseId,
        courseName: courseDetails.courseName,
        lessons: [], // Fetch and fill lesson details as per your data model
      });
    }

    return userCourses;
  } catch (error) {
    console.error("Failed to fetch user progress:", error);
    throw new Error(
      `Failed to fetch user progress for userId ${userId}: ${error}`,
    );
  }
}
