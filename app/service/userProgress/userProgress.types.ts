export type LessonDetails = {
  lessonId: number;
  lessonName: string;
  completed: boolean;
};

export type CourseDetails = {
  courseId: string;
  courseName: string;
  lessonTotal: number;
};

export type UserCourseProgress = {
  courseId: string;
  courseName: string;
  lessons: LessonDetails[];
};
