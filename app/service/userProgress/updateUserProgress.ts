import { doc, getDoc, writeBatch, serverTimestamp } from "firebase/firestore";
import db from "@/firebaseInit";
import {
  CourseDetails,
  LessonDetails,
} from "@/app/service/userProgress/userProgress.types";

export async function updateCourseAndLessonProgress(
  userId: string,
  courseDetails: CourseDetails,
  lessonDetails: LessonDetails,
): Promise<void> {
  const batch = writeBatch(db);

  // Reference to the course document
  const courseDocRef = doc(
    db,
    "user-progress",
    userId,
    "Courses",
    courseDetails.courseId,
  );

  // Check if the course exists, create or update accordingly
  const courseDocSnap = await getDoc(courseDocRef);
  if (!courseDocSnap.exists()) {
    console.log("Creating new course document with initial details.");
    batch.set(courseDocRef, {
      courseId: courseDetails.courseId,
      courseName: courseDetails.courseName,
      lessonTotal: courseDetails.lessonTotal,
      courseProgress: 0, // Initialize progress
      courseCompleted: false, // Initialize completion status
    });
  }

  // Correctly reference the lesson document within the course
  // Note: Ensure lessonId is passed as a string
  const lessonDocRef = doc(
    db,
    "user-progress",
    userId,
    "Courses",
    courseDetails.courseId,
    "Lessons",
    lessonDetails.lessonId.toString(),
  );

  console.log("Updating or creating lesson document.");
  batch.set(lessonDocRef, {
    lessonId: lessonDetails.lessonId,
    lessonName: lessonDetails.lessonName,
    completed: lessonDetails.completed,
    dateCompleted: serverTimestamp(), // Add server timestamp for date completed
  }); // Use merge to avoid overwriting other fields unintentionally

  try {
    // Commit the batch operation
    await batch.commit();
    console.log(`Course and lesson updated for user: ${userId}`);
  } catch (error) {
    console.error("Error updating course and lesson:", error);
  }
}
