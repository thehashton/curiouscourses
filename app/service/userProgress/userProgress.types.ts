import firebase from "firebase/compat/app"; // or "firebase/app" based on your setup

export type LessonDetails = {
  completed: boolean;
  dateCompleted?: firebase.firestore.Timestamp; // Assuming you're using Firestore's Timestamp type
  id?: string;
  lessonId: number;
  lessonName: string;
};

export type CourseDetails = {
  courseId: string;
  courseCompleted?: boolean;
  courseName: string;
  courseProgress?: number;
  lessonTotal: number;
};
