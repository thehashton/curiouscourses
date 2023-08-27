import React from "react";
import CourseCard from "@/app/components/CourseCard/CourseCard";
import scss from "./CourseGrid.module.scss";
import { CourseDataType } from "@/app/courses/course.types";

export type CourseGridProps = {
  courseData: CourseDataType[];
};

const CourseGrid = (props: CourseGridProps) => {
  const { courseData } = props;
  return (
    <section className={scss.CourseGrid}>
      {courseData.map((course: CourseDataType, id: number) => {
        const thumbnailUrl =
          course.attributes?.thumbnail?.data?.attributes?.url;
        return (
          <div key={course.id}>
            <CourseCard
              courseId={course.id}
              title={course.attributes.title}
              thumbnail={thumbnailUrl ? thumbnailUrl : ""}
              description={course.attributes.description}
            />
          </div>
        );
      })}
    </section>
  );
};

export default CourseGrid;
