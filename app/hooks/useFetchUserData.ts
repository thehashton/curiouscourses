import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserDataType } from "@/app/hooks/useUserData";

const useFetchUserData = () => {
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userDataCookie = Cookies.get("userData");
  const parsedUserData = JSON.parse(userDataCookie || "{}");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${parsedUserData.id}?populate=*`,
        );

        if (response.ok) {
          const fetchedData = await response.json();
          setUserData(fetchedData);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [parsedUserData.id]);

  return { userData, isLoading };
};

export default useFetchUserData;
