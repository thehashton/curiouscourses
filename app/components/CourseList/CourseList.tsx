import React, { useState, useEffect } from "react";
import scss from "./CourseList.module.scss";
import { LessonType } from "@/app/courses/course.types";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";

export type CourseListProps = {
  lessons: LessonType[];
  lessonAmount: number;
  courseId: number;
};

const CourseList = (props: CourseListProps) => {
  const { lessons, lessonAmount, courseId } = props;
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const lessonParamId = searchParams.get("lessonId");
  const theme = useTheme(); // Get the MUI theme

  useEffect(() => {
    // Checks and updates selectedLessonId when lessonParamId changes on page load
    setSelectedLessonId(lessonParamId ? parseInt(lessonParamId, 10) : 1);
  }, [lessonParamId]);

  const handleLessonClick = (lessonId: number) => {
    const lessonName = lessons[lessonId - 1]?.attributes.title;
    const formattedLessonName = lessonName?.replace(/\s+/g, "");
    const newUrl = `/courses/${courseId}?lessonId=${lessonId}&lessonName=${formattedLessonName}`;
    window.history.replaceState(null, "", newUrl);
    setSelectedLessonId(lessonId);
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
