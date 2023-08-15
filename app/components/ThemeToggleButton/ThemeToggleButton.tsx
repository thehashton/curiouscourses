"use client";
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import React from "react";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import scss from "./ThemeToggleButton.module.scss";

export type ThemeToggleButtonProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
  currentMode: "light" | "dark"; // Prop for the current mode
  showLabel?: boolean;
};

const ThemeToggleButton = (props: ThemeToggleButtonProps) => {
  const mobileCheck = useMediaQuery("(min-width: 500px)");
  const { ColorModeContext, currentMode, showLabel = false } = props;
  const colorMode = React.useContext(ColorModeContext);

  return (
    <>
      {mobileCheck && showLabel && <Typography>{currentMode}</Typography>}
      <IconButton
        className={scss[currentMode]}
        sx={{ mr: 2 }}
        title={currentMode + " mode"} // Use currentMode for title
        aria-label={currentMode + " mode button"}
        onClick={colorMode?.toggleColorMode}
      >
        {currentMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
};

export default ThemeToggleButton;
