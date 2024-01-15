import { useThemeContext } from "@/hooks/useThemeContext";
import styles from "./btn.module.css";
import { FiSun, FiMoon } from "react-icons/fi";

export const ToggleThemeBtn = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      className={styles.btn}
      onClick={toggleTheme}
      style={{
        borderColor:
          theme === "dark" ? "var(--primary-font)" : "var(--primary-bg)",
      }}
    >
      <div className={styles.icon}>
        <FiSun />
      </div>
      <div className={styles.icon}>
        <FiMoon />
      </div>
      <div
        className={styles.circle}
        style={{
          left: theme === "dark" ? "5px" : "calc(100% - 30px)",
          backgroundColor:
            theme === "dark" ? "var(--primary-font)" : "var(--primary-bg)",
        }}
      />
    </button>
  );
};
