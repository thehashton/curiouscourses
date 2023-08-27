"use client";
import { Metadata } from "next";
import React, { createContext, useEffect, useMemo, useState } from "react";
import Header from "@/app/components/Header";
import useUserData from "@/app/hooks/useUserData";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import darkTheme from "@/app/theme/darkTheme";
import lightTheme from "@/app/theme/lightTheme";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metadata: Metadata = {
    title: "CuriousCourses",
    description: "Frontend courses for the web dev learner",
    keywords: "e-learning, video courses, software development, programming",
  };

  const ThemeMUIMode = createContext({
    toggleColorMode: () => {},
  });

  const storedTheme = localStorage.getItem("theme");
  const initialMode = storedTheme || "dark";
  const [mode, setMode] = useState<"light" | "dark">(
    initialMode as "light" | "dark",
  );

  // Update stored theme when mode changes
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    [],
  );

  const userData = useUserData();
  const chosenTheme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeMUIMode.Provider value={colorMode}>
      <html lang="en">
        <head>
          <title>{metadata.title as React.ReactNode}</title>
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content={metadata.description as string | undefined}
          />
          <meta
            name="keywords"
            content={metadata.keywords as string | undefined}
          />
          <meta name="author" content="Curious Courses" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <ThemeProvider theme={createTheme(chosenTheme)}>
          <CssBaseline />
          <body
            style={{
              backgroundColor: chosenTheme?.palette?.background?.default,
              maxWidth: "80rem",
              margin: "auto",
            }}
          >
            <Header
              userData={userData}
              ColorModeContext={ThemeMUIMode}
              currentMode={mode}
              showLabel={false}
            />
            <main style={{ padding: "2rem" }}>{children}</main>
          </body>
        </ThemeProvider>
      </html>
    </ThemeMUIMode.Provider>
  );
}
