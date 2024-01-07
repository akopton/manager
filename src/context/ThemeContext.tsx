import React, { createContext, useEffect, useState } from "react";

type TTheme = "dark" | "light";

type TThemeContext = {
  theme: TTheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<TThemeContext | null>(null);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<TTheme>("light");

  const getLocalTheme = () => localStorage.getItem("theme") as TTheme;

  const setLocalTheme = (theme: TTheme) => localStorage.setItem("theme", theme);

  const toggleTheme = () => {
    const storedTheme = getLocalTheme();
    const newTheme = storedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setLocalTheme(newTheme);
  };

  useEffect(() => {
    const theme = getLocalTheme();
    if (!theme) {
      setTheme("light");
      setLocalTheme("light");
    } else setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
