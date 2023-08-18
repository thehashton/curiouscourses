// hooks/useFetchCourseData.ts
import { useEffect, useState } from "react";

const useFetchCoursesData = (): any => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCoursesData() {
      try {
        const response = await fetch(
          "http://localhost:1337/api/courses?populate=lessons",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const coursesData = await response.json();
        setCourses(coursesData.data);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    }

    fetchCoursesData();
  }, []);

  return courses;
};

export default useFetchCoursesData;
