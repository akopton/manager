import { useThemeContext } from "@/hooks/useThemeContext";
import { Nav } from "../Navigation/Nav";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();

  return (
    <div className={`theme theme-${theme}`}>
      <Nav />
      {children}
      {/* footer */}
    </div>
  );
};
