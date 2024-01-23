import { AddEventForm } from "@/components/Forms/AddEventForm";
import Head from "next/head";

export default function AddEventPage() {
  return (
    <>
      <Head>
        <title>Dodaj wydarzenie</title>
      </Head>
      <main>
        <AddEventForm />
      </main>
    </>
  );
}
