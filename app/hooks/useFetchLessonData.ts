// hooks/useFetchLessonData.ts
import { useEffect, useState } from "react";

const useFetchLessonData = (lessonId: any) => {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    async function fetchLessonData() {
      try {
        const response = await fetch(
          `http://localhost:1337/api/lessons/${lessonId}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const lessonData = await response.json();
        setLesson(lessonData.data.attributes);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    }

    if (lessonId) {
      fetchLessonData();
    }
  }, [lessonId]);

  return lesson;
};

export default useFetchLessonData;
