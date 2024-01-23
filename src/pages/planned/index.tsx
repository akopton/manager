import { api } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";

export default function PlannedPage() {
  const { data: eventsList } = api.event.getEvents.useQuery();
  return (
    <>
      <Head>
        <title>Zaplanowane</title>
      </Head>
      <main>
        <div className="flex flex-col">
          Zaplanowane wydarzenia
          <Link href="/planned/add-new">Zaplanuj</Link>
          {eventsList && (
            <ul>
              {eventsList.map((event) => (
                <li key={event.id}>{event.name}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
