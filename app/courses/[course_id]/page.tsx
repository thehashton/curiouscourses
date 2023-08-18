"use client";
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import useFetchCoursesData from "@/app/hooks/useFetchCourseData";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import IconButton from "@mui/material/IconButton";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import CourseHeader from "@/app/components/CourseHeader";
const CoursePage = () => {
  const urlParts = window.location.pathname.split("/");
  const courseId = Number(urlParts[urlParts.length - 1]);
  const course = useFetchCoursesData()[courseId - 1]?.attributes;
  const lessons = course?.lessons?.data;
  const lessonAmount = lessons?.length;

  return (
    <div>
      <CourseHeader
        title={course?.title}
        description={course?.description}
        user={course?.user}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: "8px",
        }}
      >
        <nav>
          <List>
            {lessons?.slice(0, lessonAmount).map((lesson: any) => (
              <ListItemButton
                key={lesson.id}
                style={{ display: "flex", alignItems: "flex-start" }}
                component="a"
                href={`/courses/${courseId}/lessons/${lesson.id}`}
              >
                <SlowMotionVideoIcon fontSize="large" />
                <div style={{ marginLeft: "1rem" }}>
                  <ListItemText
                    primary={lesson.attributes.title}
                    secondary={lesson.attributes.description}
                  />
                </div>
              </ListItemButton>
            ))}
          </List>
        </nav>
        <Paper
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "30rem",
            maxHeight: "30rem",
          }}
        >
          {lessons?.length == 0 ? (
            <div style={{ display: "block", textAlign: "center" }}>
              <PsychologyAltIcon
                color={"error"}
                style={{ fontSize: "5rem" }}
              ></PsychologyAltIcon>
              <Typography>
                Oops! There are currently no lessons on this course.
              </Typography>
            </div>
          ) : (
            <IconButton>
              <PlayCircleIcon fontSize={"large"}></PlayCircleIcon>
            </IconButton>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default CoursePage;
