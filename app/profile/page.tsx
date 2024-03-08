"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import {
  Box,
  Card,
  CircularProgress,
  CircularProgressProps,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import scss from "./profile.module.scss";
import { useTheme } from "@mui/system";
import { fetchUserProgress } from "@/app/service/userProgress/fetchUserProgress";
import Image from "next/image";
import { UserData } from "@/app/login/page";
import CheckIcon from "@mui/icons-material/Check";
function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" size={100} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontSize={16}
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Profile = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [userName, setUserName] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<any>(null); // State to store user progress

  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const userData: UserData = JSON.parse(Cookies.get("userData") as string);

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      const parsedUserData = JSON.parse(userDataCookie);
      setUserName(parsedUserData.userName || null);
    } else {
      console.log("No user data found.");
    }
    setIsUserDataLoading(false);
  }, []);

  const handleLogout = () => {
    // Remove the userData cookie to log the user out
    Cookies.remove("userData");
    // Redirect to the login page after logout
    router.push("/login");
  };

  const theme = useTheme();
  useEffect(() => {
    if (!isUserDataLoading && userData?.id) {
      fetchUserProgress(userData?.id.toString())
        .then((progress) => {
          setUserProgress(progress);
        })
        .catch((error) => {
          console.error("Error fetching user progress:", error);
        });
    }
  }, [userData?.id, isUserDataLoading]);

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
                <b>Email:</b> {userData?.email}
              </ListItemText>
              <ListItemText>
                <b>Account created:</b> {userData?.createdAt}
              </ListItemText>
            </List>
            <section>
              <Typography variant={"h6"} component={"h2"} fontWeight={"bold"}>
                Courses completed:
              </Typography>
            </section>
            <section style={{ marginTop: "2rem" }}>
              {userProgress ? (
                <Paper
                  elevation={10}
                  sx={{
                    display: "flex",
                    padding: 1,
                    maxWidth: "20rem",
                    margin: "auto",
                  }}
                >
                  {Object.entries(userProgress).map(
                    ([courseId, courseDetails]: any) => (
                      <div key={courseId}>
                        <h1>{courseDetails.courseName}</h1>
                        <p>
                          Description:{" "}
                          {courseDetails.courseDescription ||
                            "No description available"}
                        </p>
                        <CircularProgressWithLabel
                          value={parseFloat(courseDetails.courseProgress)}
                        />
                        <p>
                          Completed:{" "}
                          {courseDetails.courseCompleted ? "Yes" : "No"}
                          {courseDetails.courseCompleted && (
                            <CheckIcon color={"success"} />
                          )}
                        </p>
                        {courseDetails.thumbnailUrl && (
                          <Image
                            src={courseDetails.thumbnailUrl}
                            alt="Course Thumbnail"
                          />
                        )}
                      </div>
                    ),
                  )}
                </Paper>
              ) : (
                <div>Loading...</div> // Display a loading message until data is fetched
              )}
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
