/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({ user: { name: "" } });

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getuser", {
          withCredentials: true,
        });
        const { name, email } = response.data;
        console.log(name);
        setUser({ name, email });
      } catch (error) {
        // console.error("Failed to get user data:", error);
      }
    };

    getUserData();
  }, []);

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
