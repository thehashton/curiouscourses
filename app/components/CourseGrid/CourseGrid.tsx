import React from "react";
import CourseCard from "@/app/components/CourseCard/CourseCard";
import scss from "./CourseGrid.module.scss";

export type CourseGridProps = {
  courseData: CourseDataType[];
};

export type CourseDataType = {
  id: number;
  attributes: {
    title: string;
    description: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    lessons: LessonDataType[];
  };
};

export type LessonDataType = {
  data: {
    id: number;
    attributes: {
      title: string;
      description: string;
      duration: string;
      video_url: string;
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
    };
  }[];
};

const CourseGrid = (props: CourseGridProps) => {
  const { courseData } = props;
  console.log(courseData);
  return (
    <section className={scss.CourseGrid}>
      {courseData.map((course: CourseDataType) => (
        <CourseCard
          key={course.id}
          courseId={course.id}
          title={course.attributes.title}
          description={course.attributes.description}
        />
      ))}
    </section>
  );
};

export default CourseGrid;
