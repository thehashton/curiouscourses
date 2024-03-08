import {
  doc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  setDoc,
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
  const courseDocRef = doc(
    db,
    "user-progress",
    userId,
    "Courses",
    courseDetails.courseId,
  );
  const lessonDocRef = doc(
    courseDocRef,
    "Lessons",
    lessonDetails.lessonId ? lessonDetails.lessonId.toString() : "1",
  );

  // Mark the lesson as completed with a separate document write
  await setDoc(
    lessonDocRef,
    {
      ...lessonDetails,
      completed: true,
      dateCompleted: serverTimestamp(),
    },
    { merge: true },
  );

  // Now fetch all lessons to check their completion status
  const lessonsQuery = query(collection(courseDocRef, "Lessons"));
  const lessonsSnapshot = await getDocs(lessonsQuery);
  const completedLessonsCount = lessonsSnapshot.docs.filter(
    (doc) => doc.data().completed,
  ).length;
  const totalLessons = courseDetails.lessonTotal;
  const allLessonsCompleted =
    completedLessonsCount === courseDetails.lessonTotal;

  // Update course document with new details, including the computed course progress
  await setDoc(
    courseDocRef,
    {
      courseName: courseDetails.courseName,
      thumbnailUrl: courseDetails.thumbnailUrl || "", // Ensure no undefined values
      courseDescription: courseDetails.courseDescription || "",
      courseProgress: ((completedLessonsCount / totalLessons) * 100).toFixed(2),
      courseCompleted: allLessonsCompleted,
    },
    { merge: true },
  );
}
