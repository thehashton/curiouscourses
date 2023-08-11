'use client';
import { Metadata } from "next";
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from "@/app/components/Header";
import useUserData from "@/app/hooks/useUserData";

const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Enable dark mode
    },
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const metadata: Metadata = {
        title: 'CuriousCourses',
        description: 'Frontend courses for the web dev learner',
    }
    const userData = useUserData();

    return (
    <html lang="en">
      <body style={{background: 'black', color: 'white', maxWidth: '80rem', margin: 'auto'}}>
          <ThemeProvider theme={darkTheme}>
              <Header userData={userData}/>
              {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
