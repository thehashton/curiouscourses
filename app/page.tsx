"use client";

import CourseGrid from "@/app/components/CourseGrid/CourseGrid";
import React, { useEffect, useState } from "react";
import Hero from "@/app/components/Hero";
import UseFetchCoursesData from "@/app/hooks/useFetchCourseData";
import Cookies from "js-cookie";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const courses = UseFetchCoursesData();

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      try {
        const parsedUserData = JSON.parse(userDataCookie);
        if (parsedUserData.id) {
          setUserId(parsedUserData.id.toString());
        }
      } catch (error) {
        console.error("Error parsing userData cookie:", error);
      }
    }
  }, []);

  if (!userId) {
    return <p>Loading user data...</p>;
  }

  return (
    <>
      <Hero />
      <CourseGrid courseData={courses} userId={userId} /> {/* ✅ Pass userId */}
    </>
  );
}
