/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { englishText } from "./englishText";
import { polishText } from "./polishText";

const apiUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://vitqnt-backend.onrender.com/api"
    : "http://localhost:3000/api";

export const UserContext = createContext({
  user: { name: "" },
  loading: false,
  language: "english",
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [language, setLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "english"
  );
  const [languageText, setLanguageText] = useState(englishText);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getuser`, {
          withCredentials: true,
        });
        const { name, email, sex, age, vitaminIntake } = response.data;
        setUser({ name, email, sex, age, vitaminIntake });
        setLoading(false); // Set loading to false once user data is fetched
        // console.log(name);
      } catch (error) {
        setLoading(false); // Set loading to false on error as well
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    setLanguageText(language === "english" ? englishText : polishText);
  }, [language]);

  const value = {
    user,
    setUser,
    loading,
    apiUrl,
    language,
    setLanguage,
    languageText,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
