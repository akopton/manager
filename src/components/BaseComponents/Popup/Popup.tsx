import { useThemeContext } from "@/hooks/useThemeContext";
import styles from "./popup.module.css";

export const Popup = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();
  return (
    <div className={`theme-${theme} ${styles.popup as string}`}>{children}</div>
  );
};
