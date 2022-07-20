import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, defaultTheme } from "../helper/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext<ITheme>();

const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  const findOldTheme = async () => {
    const themeMode = await AsyncStorage.getItem("themeMode");
    if (themeMode !== null) {
      themeMode === "default" ? setTheme(defaultTheme) : setTheme(darkTheme);
      setIsLoadingTheme(false);
    }
    setIsLoadingTheme(false);
  };

  const updateTheme = (currentThemeMode: string) => {
    const newTheme = currentThemeMode === "default" ? darkTheme : defaultTheme;
    setTheme(newTheme);
    AsyncStorage.setItem("themeMode", newTheme.themeMode);
  };

  useEffect(() => {
    findOldTheme();
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, isLoadingTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;

const styles = StyleSheet.create({});

interface ITheme {
  theme: Theme;
  isLoadingTheme: boolean;
  updateTheme: (themeMode: string) => void;
}

interface Theme {
  backgroundColor: string;
  textColor: string;
  themeMode: string;
}
