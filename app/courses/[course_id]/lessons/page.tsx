"use client";
import React from "react";
import useFetchCoursesData from "../../../hooks/useFetchCourseData";
import { Typography } from "@mui/material";
import Link from "next/link";

const LessonsPage = () => {
  const courses = useFetchCoursesData();

  const lessonAmount = (id: number) =>
    courses[id].attributes?.lessons?.data.length;
  return (
    <div>
      <h1>All Lessons</h1>
      <ul>
        {courses.map((course: any, id: number) => {
          course.attributes?.lessons?.data
            ?.slice(0, lessonAmount(id))
            .map((lesson: any) => (
              <li key={lesson.id}>
                <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                  <Typography color={"primary"}>
                    Lesson: {lesson.attributes.title}
                  </Typography>
                </Link>
              </li>
            ));
        })}
      </ul>
    </div>
  );
};

export default LessonsPage;
