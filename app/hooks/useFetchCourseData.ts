"use client";
import { useEffect, useState } from "react";

// Add an optional courseId parameter to the hook
const UseFetchCoursesData = (courseId?: string) => {
  const [courses, setCourses] = useState([] as any);

  useEffect(() => {
    async function fetchCoursesData() {
      try {
        // Adjust the API URL based on whether a courseId is provided
        const url = courseId
          ? `http://localhost:1337/api/courses/${courseId}?populate=*` // Fetch specific course by ID
          : `http://localhost:1337/api/courses?populate=*`; // Fetch all courses

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const coursesData = await response.json();

        // If fetching a specific course, wrap the result in an array to keep the return type consistent
        setCourses(courseId ? [coursesData.data] : coursesData.data);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    }

    fetchCoursesData().then((r) => r);
  }, [courseId]); // Re-run the effect if courseId changes

  return courses;
};

export default UseFetchCoursesData;
