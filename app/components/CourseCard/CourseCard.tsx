"use client";
import React from "react";
import Link from "next/link";
import { Avatar, Paper, Typography } from "@mui/material";
import scss from "./CourseCard.module.scss";
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";

export type CourseCardProps = {
  title: string;
  description: string;
  courseId: number;
  thumbnail: string;
  courseProgress?: string;
  courseCompleted?: boolean;
};

const CourseCard = (props: CourseCardProps) => {
  const {
    title,
    description,
    courseId,
    thumbnail,
    courseProgress = "0",
    courseCompleted = false,
  } = props;
  return (
    <Link className={scss.courseLink} href={`/courses/${courseId}`}>
      <Paper
        className={scss.CourseCard}
        variant={"elevation"}
        sx={{
          p: 2,
          backgroundColor: "transparent",
        }}
      >
        <Image
          className={scss.cardImage}
          src={
            thumbnail
              ? `${process?.env?.NEXT_PUBLIC_STRAPI_IMAGES_DOMAIN}${thumbnail}`
              : ""
          }
          alt={title}
          title={description}
          width={150}
          height={150}
        />
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
        <Typography fontSize={"small"}>{description}</Typography>
        <div className={scss.author} style={{ marginBottom: "1rem" }}>
          <Avatar sx={{ height: 34, width: 34 }} />
          <Typography fontSize={"small"}>Harry Ashton</Typography>
        </div>
        <LinearProgress
          variant="determinate"
          color={`${courseCompleted ? "success" : "primary"}`}
          value={parseInt(String(courseProgress), 10)}
          sx={{ height: "20px", marginTop: "20px", borderRadius: "8px" }}
        />
      </Paper>
    </Link>
  );
};

export default CourseCard;
