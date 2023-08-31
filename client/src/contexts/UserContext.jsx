/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({ user: { name: "" } });

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getuser", {
          withCredentials: true,
        });
        const { name, email, sex, age, vitaminIntake } = response.data;
        setUser({ name, email, sex, age, vitaminIntake });
        setLoading(false); // Set loading to false once user data is fetched
        console.log(name);
      } catch (error) {
        // console.error("Failed to get user data:", error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    getUserData();
  }, []);

  const value = { user, setUser, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
