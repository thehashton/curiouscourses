"use client";
import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import scss from "./Header.module.scss";
import { Typography } from "@mui/material";
import ThemeToggleButton from "@/app/components/ThemeToggleButton";
import { UserDataType } from "@/app/hooks/useUserData";

interface HeaderProps {
  userData: UserDataType | null;
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
  currentMode: "light" | "dark"; // Prop for the current mode
  showLabel?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  userData,
  ColorModeContext,
  currentMode,
  showLabel,
}) => {
  const router = useRouter(); // Initialize the useRouter hook
  const handleSignOut = () => {
    router.push("/logout");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <header className={scss.header}>
      <nav className={scss.nav}>
        <ul className={scss.menu}>
          <li>
            <Button variant={"text"} href={"/"}>
              <Typography variant={"h6"} style={{ textTransform: "initial" }}>
                CuriousCourses
              </Typography>
            </Button>
          </li>
          <li>
            <Link href="/">
              <Typography>Home</Typography>
            </Link>
          </li>
          {!userData ? (
            <>
              <li>
                <Link href="/login">
                  <Typography>Login</Typography>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/profile">
                  <Typography>Profile</Typography>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <Typography>Courses</Typography>
                </Link>
              </li>
            </>
          )}
          <li style={{ marginLeft: "auto" }}>
            <ThemeToggleButton
              ColorModeContext={ColorModeContext}
              currentMode={currentMode}
              showLabel={showLabel}
            />
          </li>
        </ul>
        {userData?.isLoggedIn ? (
          <Button
            className={scss.signOutBtn}
            color={"error"}
            onClick={handleSignOut}
            variant="contained"
          >
            Sign Out
          </Button>
        ) : (
          <>
            <Button
              className={scss.signOutBtn}
              color={"success"}
              onClick={handleSignIn}
              variant="contained"
              style={{ marginRight: "1rem" }}
            >
              Sign In
            </Button>
            <Button
              className={scss.signOutBtn}
              color={"info"}
              href={"/register"}
              variant="contained"
            >
              Register
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
