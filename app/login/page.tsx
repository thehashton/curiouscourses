"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import scss from "./login.module.scss";
import { Typography } from "@mui/material";

interface UserData {
  authToken: string;
  userName: string;
  isLoggedIn: boolean;
}

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // When reading the cookie, parse the JSON data
    const userDataCookie = Cookies.get("userData");
    const parsedUserData = JSON.parse(userDataCookie || "{}") as UserData; // Explicitly cast to UserData
    setUserData(parsedUserData);
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Format the user-related data before storing in the cookie
        const userData = {
          authToken: data.jwt,
          userName: data.user.username,
          isLoggedIn: data.user.confirmed,
        };

        Cookies.set("userData", JSON.stringify(userData), { expires: 7 }); // Expires in 7 days

        // Update the user data in the state to trigger re-render
        setUserData(userData);
        location.reload();
        // Redirect to the profile page
        // router.push('/profile'); // Replace '/profile' with your actual profile page route
      } else {
        setLoginError(data.message[0].messages[0].message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login. Please try again later.");
    }
  };

  const handleSignOut = () => {
    // Remove the userData cookie to log the user out
    Cookies.remove("userData");
    // Clear the user data from state to trigger re-render
    setUserData(null);
    location.reload();
    // router.push('/login'); // Replace '/profile' with your actual profile page route
  };

  return (
    <div className={scss.login}>
      <Typography>Login</Typography>
      {!userData?.isLoggedIn && (
        <form onSubmit={handleLogin}>
          <TextField
            label="Username or Email"
            variant="outlined"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            autoComplete={"true"}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleLogin}
            style={{ marginRight: "0.5rem" }}
          >
            Login
          </Button>
          <Button variant="contained" color={"info"} href={"/register"}>
            Register
          </Button>
        </form>
      )}
      {userData?.isLoggedIn && (
        <div>
          <p>Logged in as: {userData.userName}</p>
          <p>Is logged in: {userData.isLoggedIn ? "Yes" : "No"}</p>
          <Button variant="contained" onClick={handleSignOut} color={"error"}>
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
