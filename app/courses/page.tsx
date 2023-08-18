"use client";
import React from "react";
import useFetchCoursesData from "../hooks/useFetchCourseData";
import CourseGrid from "@/app/components/CourseGrid/CourseGrid";
import { Typography } from "@mui/material";
import CourseHeader from "@/app/components/CourseHeader";

const CoursePage = () => {
  const courses = useFetchCoursesData();

  return (
    <div>
      <CourseHeader
        href={"/"}
        title={"Courses"}
        description={
          "Choose from our many courses on Frontend development and start your learning journey today!"
        }
      />
      <CourseGrid courseData={courses} />
    </div>
  );
};

export default CoursePage;
