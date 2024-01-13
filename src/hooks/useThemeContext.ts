import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Theme context is not initialized");
  else return context;
};
