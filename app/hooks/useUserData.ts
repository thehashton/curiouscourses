import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export type UserDataType = {
  id: number;
  userName: string;
  email: string;
  createdAt: string;
  authToken: string;
  isLoggedIn?: boolean;
  watchedLessons?: number[];
};

const useUserData = () => {
  const [userData, setUserData] = useState<UserDataType>();

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    const parsedUserData = JSON.parse(userDataCookie || "{}") as UserDataType;
    setUserData(parsedUserData);

    // Listen for the storage event to update the user data
    const storageEventListener = (event: StorageEvent) => {
      if (event.key === "userData") {
        const updatedUserData = JSON.parse(
          event.newValue || "{}",
        ) as UserDataType;
        setUserData(updatedUserData);
      }
    };

    window.addEventListener("storage", storageEventListener);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", storageEventListener);
    };
  }, []);

  return userData;
};

export default useUserData;
