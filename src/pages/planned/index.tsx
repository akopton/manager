import Calendar from "@/components/Calendar/Calendar";
import { api } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";

export default function PlannedPage() {
  const { data: eventsList } = api.event.getEvents.useQuery();

  const calendarDates = eventsList?.map((event) => event.date);
  return (
    <>
      <Head>
        <title>Zaplanowane</title>
      </Head>
      <main>
        <div className="flex flex-col">
          Zaplanowane wydarzenia
          <Link href="/planned/add-new">Zaplanuj</Link>
          <Calendar selected={eventsList} />
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
