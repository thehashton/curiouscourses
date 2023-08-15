"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import scss from "./profile.module.scss";
import { useTheme } from "@mui/system";

const Profile = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Read the user data cookie and parse the JSON data
    const userDataCookie = Cookies.get("userData");
    const parsedUserData = JSON.parse(userDataCookie || "{}");
    setUserName(parsedUserData.userName || null);
  }, []);

  const handleLogout = () => {
    // Remove the userData cookie to log the user out
    Cookies.remove("userData");
    // Redirect to the login page after logout
    router.push("/login");
  };
  const theme = useTheme();

  return (
    <div className={scss.profile}>
      {userName ? (
        <>
          <Typography
            variant={"h6"}
            component={"h1"}
            color={theme?.palette?.text?.primary}
          >
            Welcome to your profile page,{" "}
            <span style={{ color: "red" }}>{userName}</span>!
          </Typography>
          <Button
            style={{ marginTop: "2rem" }}
            variant="contained"
            onClick={handleLogout}
            color={"error"}
          >
            Log Out
          </Button>
        </>
      ) : (
        <Typography>You need to sign in.</Typography>
      )}
    </div>
  );
};

export default Profile;
