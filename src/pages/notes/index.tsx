import { NotesLayout } from "@/components_old/Layouts/NotesLayout";
import Head from "next/head";

export default function NotesPage() {
  return (
    <>
      <Head>
        <title>notatki</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotesLayout>
        <main className="h-full w-full">select a note...</main>
      </NotesLayout>
    </>
  );
}
