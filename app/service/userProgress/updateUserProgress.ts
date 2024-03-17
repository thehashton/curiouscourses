import {
  doc,
  writeBatch,
  serverTimestamp,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
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

  // Correctly reference the lesson document within the course
  const lessonDocRef = doc(
    courseDocRef,
    "Lessons",
    lessonDetails.lessonId.toString(),
  );

  // Set the lesson as completed
  batch.set(
    lessonDocRef,
    {
      ...lessonDetails, // Assuming lessonDetails includes 'completed: true' and other necessary details
      dateCompleted: serverTimestamp(), // Add server timestamp for date completed
    },
    { merge: true },
  );

  // Fetch all lessons to check completion status
  const lessonsQuery = query(collection(courseDocRef, "Lessons"));
  const lessonsSnapshot = await getDocs(lessonsQuery);
  let completedLessonsCount = 1;

  lessonsSnapshot.forEach((doc) => {
    if (doc.data().completed) {
      completedLessonsCount++;
    }
  });

  let allLessonsCompleted = completedLessonsCount === courseDetails.lessonTotal;

  // Update course document with the new progress and completion status
  batch.set(
    courseDocRef,
    {
      courseProgress: (completedLessonsCount / courseDetails.lessonTotal) * 100,
      courseCompleted: allLessonsCompleted,
    },
    { merge: true },
  );

  try {
    // Commit the batch operation
    await batch.commit();
    console.log(`Course and lesson updated for user: ${userId}`);
  } catch (error) {
    console.error("Error updating course and lesson:", error);
  }
}
