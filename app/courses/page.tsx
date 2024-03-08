"use client";
import CourseGrid from "@/app/components/CourseGrid/CourseGrid";
import CourseHeader from "@/app/components/CourseHeader";
import FetchCoursesData from "@/app/hooks/useFetchCourseData";

const CoursePage = () => {
  const courseDetails = FetchCoursesData();
  return (
    <>
      <CourseHeader
        href={"/"}
        title={"Courses"}
        description={
          "Choose from our many courses on Frontend development and start your learning journey today!"
        }
      />
      <CourseGrid courseData={courseDetails} />
    </>
  );
};

export default CoursePage;
