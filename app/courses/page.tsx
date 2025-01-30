"use client";

import React, { useEffect, useState } from "react";
import CourseGrid from "@/app/components/CourseGrid/CourseGrid";
import CourseHeader from "@/app/components/CourseHeader";
import FetchCoursesData from "@/app/hooks/useFetchCourseData";
import Cookies from "js-cookie";

const CoursePage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const courseDetails = FetchCoursesData();

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
      <CourseHeader
        href={"/"}
        title={"Courses"}
        description={
          "Choose from our many courses on Frontend development and start your learning journey today!"
        }
      />
      <CourseGrid courseData={courseDetails} userId={userId} />
    </>
  );
};

export default CoursePage;
