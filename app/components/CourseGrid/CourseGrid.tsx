"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "@/app/components/CourseCard/CourseCard";
import FetchCoursesData from "@/app/hooks/useFetchCourseData";
import scss from "./CourseGrid.module.scss";
import { fetchUserProgress } from "@/app/service/userProgress/fetchUserProgress";

export type CourseGridProps = {
  courseData: any;
  userId: string;
};

const CourseGrid = ({ courseData, userId }: CourseGridProps) => {
  const [progressData, setProgressData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId) return;
      try {
        const data = await fetchUserProgress(userId);
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [userId]);

  return (
    <section className={scss.CourseGrid}>
      {courseData?.map((course: any) => {
        const courseIdStr = course.id.toString();
        const courseProgress =
          progressData?.[courseIdStr]?.courseProgress || "0";
        const courseCompleted =
          progressData?.[courseIdStr]?.courseCompleted || false;
        const thumbnailUrl =
          course.attributes?.thumbnail?.data?.attributes?.url;

        return (
          <div key={course.id}>
            <CourseCard
              courseId={course.id}
              title={course.attributes.title}
              thumbnail={thumbnailUrl || ""}
              description={course.attributes.description}
              courseProgress={courseProgress}
              courseCompleted={courseCompleted}
            />
          </div>
        );
      })}
    </section>
  );
};

export default CourseGrid;
