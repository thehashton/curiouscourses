import React from "react";
import Link from "next/link";
import { Avatar, Paper, Typography } from "@mui/material";
import scss from "./CourseCard.module.scss";
import Button from "@mui/material/Button";

export type CourseCardProps = {
  key: number;
  title: string;
  description: string;
  courseId: number;
};

const CourseCard = (props: CourseCardProps) => {
  const { key, title, description, courseId } = props;
  return (
    <Link
      className={scss.courseLink}
      href={`/courses/${courseId}`}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Paper
        className={scss.CourseCard}
        key={key}
        variant={"elevation"}
        sx={{ p: 2, bgcolor: "background.default" }}
      >
        <Typography
          fontSize={12}
          color={"primary.light"}
          fontWeight={"bold"}
          letterSpacing={3}
          sx={{ textTransform: "uppercase" }}
        >
          Course
        </Typography>
        <Typography
          variant={"body1"}
          fontWeight={"bold"}
          fontSize={"16px"}
          component={"h2"}
          sx={{ marginBottom: "0.25rem" }}
        >
          {title}
        </Typography>
        <Typography fontSize={"medium"}>{description}</Typography>
        <div className={scss.author} style={{ marginBottom: "1rem" }}>
          <Avatar sx={{ height: 34, width: 34 }} />
          <Typography fontSize={"small"}>Harry Ashton</Typography>
        </div>
      </Paper>
    </Link>
  );
};

export default CourseCard;
