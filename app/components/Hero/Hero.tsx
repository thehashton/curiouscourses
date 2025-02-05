import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import scss from "./Hero.module.scss";

const Hero = () => {
  return (
    <Paper className={scss.Hero} variant={"elevation"} elevation={5}>
      <Typography variant="h1" fontSize={30} fontWeight={'bold'}>Welcome to Curious Courses</Typography>
      <Typography variant="h2" fontSize={20}>Frontend courses that will supercharge your learning!</Typography>
      <Button variant="contained">View Courses</Button>
    </Paper>
  );
};

export default Hero;
