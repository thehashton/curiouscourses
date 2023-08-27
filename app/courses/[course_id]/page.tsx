"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import useFetchCoursesData from "@/app/hooks/useFetchCourseData";
import CourseHeader from "@/app/components/CourseHeader";
import scss from "./course.module.scss";
import CourseList from "@/app/components/CourseList";
import CoursePlayer from "@/app/components/CoursePlayer";
import { useSearchParams } from "next/navigation";

const CoursePage = () => {
  const urlParts = window.location.pathname.split("/");
  const courseId = Number(urlParts[urlParts.length - 1]);
  const course = useFetchCoursesData()[courseId - 1]?.attributes;
  const lessons = course?.lessons?.data;
  const lessonAmount = lessons?.length;

  const [selectedLessonId, setSelectedLessonId] = useState<string | number>(1);
  const searchParams = useSearchParams();
  const lessonParamId = searchParams.get("lessonId");
  const lessonVideoUrl = lessons
    ? lessons[selectedLessonId]?.attributes.video_url
    : "";

  useEffect(() => {
    // Checks and updates selectedLessonId when lessonParamId changes on page load
    setSelectedLessonId(lessonParamId ? parseInt(lessonParamId, 10) - 1 : 1);
  }, [lessonParamId]);

  return (
    <div>
      <CourseHeader
        title={course?.title}
        description={course?.description}
        user={course?.user?.data?.attributes?.username}
      />
      <Box className={scss.courseFrame} sx={{ bgcolor: "background.paper" }}>
        <CourseList
          lessons={lessons}
          lessonAmount={lessonAmount}
          courseId={courseId}
        />
        <CoursePlayer lessons={lessons} lessonVideoUrl={lessonVideoUrl} />
      </Box>
    </div>
  );
};

export default CoursePage;
