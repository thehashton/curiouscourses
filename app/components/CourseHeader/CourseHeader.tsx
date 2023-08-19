import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";

export type CourseHeaderProps = {
  title: string;
  description: string;
  href?: string;
  user?: string;
};

const CourseHeader = (props: CourseHeaderProps) => {
  const { title, user, description, href } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        marginBottom: "2rem",
      }}
    >
      <IconButton
        href={href || "/courses"}
        aria-label={"Go back to courses"}
        title={"Go back to courses"}
      >
        <ArrowBackIcon color={"action"}></ArrowBackIcon>
      </IconButton>
      <div>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Typography>{user}</Typography>
      </div>
    </div>
  );
};

export default CourseHeader;
