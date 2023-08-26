import React, { useEffect, useState } from "react";
import scss from "./CoursePlayer.module.scss";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { Paper, Typography } from "@mui/material";
import { LessonType } from "@/app/courses/course.types";
import { useSearchParams } from "next/navigation";

export type CoursePlayerProps = {
  lessons: LessonType[];
  lessonVideoUrl: string;
};

const CoursePlayer = (props: CoursePlayerProps) => {
  const { lessons, lessonVideoUrl } = props;

  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const lessonParamId = searchParams.get("lessonId");

  useEffect(() => {
    // Checks and updates selectedLessonId when lessonParamId changes on page load
    setSelectedLessonId(lessonParamId ? parseInt(lessonParamId, 10) : null);
  }, [lessonParamId]);

  return (
    <Paper
      className={scss.CoursePlayer}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "30rem",
        maxHeight: "30rem",
      }}
    >
      {lessons?.length == 0 || undefined ? (
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
        <iframe
          width="100%"
          height="480"
          src={lessonVideoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      )}
    </Paper>
  );
};

export default CoursePlayer;
