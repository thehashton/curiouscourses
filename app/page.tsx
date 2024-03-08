"use client";
import CourseGrid from "@/app/components/CourseGrid/CourseGrid";
import React from "react";
import Hero from "@/app/components/Hero";
import UseFetchCoursesData from "@/app/hooks/useFetchCourseData";

export default function Home() {
  const courses = UseFetchCoursesData();

  return (
    <>
      <Hero />
      <CourseGrid courseData={courses} />
    </>
  );
}
