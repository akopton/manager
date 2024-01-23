import Head from "next/head";
import Link from "next/link";

export default function PlannedPage() {
  return (
    <>
      <Head>
        <title>Zaplanowane</title>
      </Head>
      <main>
        <div>
          Zaplanowane wydarzenia
          <Link href="/planned/add-new">Zaplanuj</Link>
        </div>
      </main>
    </>
  );
}
