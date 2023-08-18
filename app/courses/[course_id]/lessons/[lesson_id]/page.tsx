"use client";
import React from "react";
import useFetchLessonData from "../../../../hooks/useFetchLessonData";
import CourseHeader from "@/app/components/CourseHeader";

const LessonPage: React.FC = () => {
  const urlParts = window.location.pathname.split("/");
  const lessonId: number = Number(urlParts[urlParts.length - 1]);
  const courseId: number = Number(urlParts[urlParts.length - 3]);

  // Fetch lesson data using the lesson ID
  const lesson: any = useFetchLessonData(lessonId);

  return (
    <div>
      {lesson ? (
        <div style={{ maxWidth: "80rem", margin: "auto" }}>
          <CourseHeader
            href={`/courses/${courseId}`}
            title={lesson?.title}
            description={lesson?.description}
          />
          <iframe
            width="80%"
            height="480"
            style={{ display: "flex", margin: "auto" }}
            src={`${lesson?.video_url}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
          <p>{lesson?.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LessonPage;
