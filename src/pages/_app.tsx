import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { MainLayout } from "@/components_old/Layouts/MainLayout";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { useRouter } from "next/router";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated" && router.pathname !== "/login") {
    router.push("/login");
  }

  return children;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <RouteGuard>
        <ThemeContextProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeContextProvider>
      </RouteGuard>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
