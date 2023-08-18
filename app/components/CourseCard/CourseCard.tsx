import React from "react";
import Link from "next/link";
import { Paper } from "@mui/material";
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
        <h2>{title}</h2>
        <p>{description}</p>
        <Button
          href={`/courses/${courseId}`}
          variant={"contained"}
          size={"large"}
          style={{ height: "3rem", marginTop: "auto" }}
        >
          View Course
        </Button>
      </Paper>
    </Link>
  );
};

export default CourseCard;
