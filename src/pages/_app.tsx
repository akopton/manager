import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { MainLayout } from "@/components/Layouts/MainLayout";
import { ThemeContextProvider } from "@/context/ThemeContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
