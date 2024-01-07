import { useThemeContext } from "@/hooks/useThemeContext";
import { Nav } from "../Navigation/Nav";
import { useSession } from "next-auth/react";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const { theme } = useThemeContext();

  return (
    <div className={`theme theme-${theme}`}>
      {status === "authenticated" && <Nav />}
      {children}
    </div>
  );
};
