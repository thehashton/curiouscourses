"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { List, ListItemText, Paper, Typography } from "@mui/material";
import scss from "./profile.module.scss";
import { useTheme } from "@mui/system";
import { UserData } from "@/app/login/page";

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
  const userData: UserData = JSON.parse(Cookies.get("userData") as string);

  return (
    <div className={scss.profile}>
      {userName ? (
        <>
          <Paper sx={{ padding: 4 }}>
            <Typography
              variant={"h6"}
              component={"h1"}
              color={theme?.palette?.text?.primary}
            >
              Welcome to your profile page,{" "}
              <span style={{ color: "red" }}>{userName}</span>!
            </Typography>
            <List>
              <ListItemText>
                <b>Username:</b> {userName}
              </ListItemText>
              <ListItemText>
                <b>Email:</b> {userData.email}
              </ListItemText>
              <ListItemText>
                <b>Account created:</b> {userData?.createdAt}
              </ListItemText>
            </List>
            <section>
              <Typography variant={"h6"} component={"h2"}>
                Courses completed:
              </Typography>
              <ol
                style={{
                  maxWidth: "20rem",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <li>Advanced JavaScript</li>
              </ol>
            </section>
            <section>
              <p>{}</p>
            </section>
            <Button
              style={{ marginTop: "2rem" }}
              variant="contained"
              onClick={handleLogout}
              color={"error"}
            >
              Log Out
            </Button>
          </Paper>
        </>
      ) : (
        <Paper sx={{ padding: 2 }}>
          <Typography>You need to sign in.</Typography>
        </Paper>
      )}
    </div>
  );
};

export default Profile;
