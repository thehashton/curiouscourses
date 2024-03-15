import React, { useState, useEffect } from "react";
import scss from "./CourseList.module.scss";
import { LessonType } from "@/app/courses/course.types";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie";
import { UserData } from "@/app/login/page";
import { updateCourseAndLessonProgress } from "@/app/service/userProgress/updateUserProgress";

import { collectionGroup, getDocs } from "firebase/firestore";
import db from "@/firebaseInit";
import { fetchAllLessons } from "@/app/service/userProgress/fetchAllLessons";
require("firebase/firestore");
export type CourseListProps = {
  lessons: LessonType[];
  lessonAmount: number;
  courseId: number;
  courseName: string;
};

const CourseList = (props: CourseListProps) => {
  const { lessons, lessonAmount, courseId, courseName } = props;
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const lessonParamId = searchParams.get("lessonId");
  const theme = useTheme(); // Get the MUI theme

  useEffect(() => {
    // Checks and updates selectedLessonId when lessonParamId changes on page load
    setSelectedLessonId(lessonParamId ? parseInt(lessonParamId, 10) : 1);
  }, [lessonParamId]);

  const [lesson, processLesson] = useState([]);
  const userData: UserData = JSON.parse(Cookies.get("userData") as string);
  // const userId = userData?.id.toString();

  async function fetchAllCourses() {
    try {
      const querySnapshot = await getDocs(collectionGroup(db, "Courses"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

      if (querySnapshot.empty) {
        console.log("No courses found.");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }
  // CONSOLE LOG LESSONS
  useEffect(() => {
    // fetchAllCourses();
    fetchAllLessons()
      .then((lessonsArray) => {
        // Do something with the lessons array
        console.log(lessonsArray);
      })
      .catch(console.error);
  }, []);

  // CONSOLE LOG COURSES
  useEffect(() => {
    // fetchAllCourses();
    fetchAllCourses()
      .then((lessonsArray) => {
        // Do something with the lessons array
        console.log(lessonsArray);
      })
      .catch(console.error);
  }, []);

  const handleLessonClick = async (lessonId: number) => {
    const lessonName = lessons[lessonId - 1]?.attributes.title;
    const formattedLessonName = lessonName?.replace(/\s+/g, "");
    const newUrl = `/courses/${courseId}?lessonId=${lessonId}&lessonName=${formattedLessonName}`;
    window.history.replaceState(null, "", newUrl);
    setSelectedLessonId(lessonId);

    await updateCourseAndLessonProgress(
      userData?.id.toString(),
      {
        courseId: courseId.toString(),
        courseName: courseName,
        lessonTotal: lessonAmount,
      },
      { lessonId: lessonId, lessonName: lessonName, completed: true },
    );
    window.location.reload();
  };

  return (
    <nav className={scss.lessonNavigation}>
      <List
        className={scss.CourseList}
        sx={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {lessons?.slice(0, lessonAmount).map((lesson: any, id: number) => (
          <ListItemButton
            key={lesson.id}
            className={scss.listItem}
            style={{
              backgroundColor:
                selectedLessonId === lesson.id
                  ? theme.palette.primary.main
                  : "transparent",
            }}
            component="a"
            onClick={() => handleLessonClick(lesson.id)}
          >
            <div style={{ textAlign: "center" }}>
              <SlowMotionVideoIcon fontSize="large" />
              <Typography fontSize={"small"}>
                {lesson.attributes.duration}
              </Typography>
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <ListItemText
                style={{ margin: "0.5rem 0" }}
                primary={`${id + 1}. ${lesson.attributes.title}`}
                secondary={lesson.attributes.description}
              />
            </div>
          </ListItemButton>
        ))}
      </List>
    </nav>
  );
};

export default CourseList;
