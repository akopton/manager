import { useThemeContext } from "@/hooks/useThemeContext";
import { Nav } from "../Navigation/Nav";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const { theme } = useThemeContext();

  return (
    <div className={`theme theme-${theme}`}>
      {status === "authenticated" && <Nav />}
      {children}
      <ToastContainer position="bottom-right" />
    </div>
  );
};
