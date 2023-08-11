'use client';
import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UserDataType } from "@/app/hooks/useUserData";
import scss from './logout.module.scss';

const LogoutPage = () => {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const router = useRouter(); // Initialize the useRouter hook

    useEffect(() => {
        // When reading the cookie, parse the JSON data
        const userDataCookie = Cookies.get('userData');
        const parsedUserData = JSON.parse(userDataCookie || '{}') as UserDataType; // Explicitly cast to UserData
        setUserData(parsedUserData);
    }, []);

    const handleSignOut = () => {
        // Remove the userData cookie to log the user out
        Cookies.remove('userData');
        // Clear the user data from state to trigger re-render
        setUserData(null);
        location.reload()
        // router.push('/login'); // Replace '/profile' with your actual profile page route
    };

    const handleSignIn = () => {
        // Remove the userData cookie to log the user out
        // Cookies.remove('userData');
        // // Clear the user data from state to trigger re-render
        // setUserData(null);
        router.push('/login'); // Replace '/profile' with your actual profile page route
    };

    console.log(userData)

    return (
        <div className={scss.logout}>
            {
                userData?.isLoggedIn ? (
                    <>
                        <Typography variant={'h6'}>Are you sure you want to sign out?</Typography>
                        <Button variant="contained" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant={'h6'}>Thank you for signing out</Typography>
                        <Button variant="contained" onClick={handleSignIn}>
                            Sign In
                        </Button>
                    </>
                )
            }
        </div>
    );
};

export default LogoutPage;