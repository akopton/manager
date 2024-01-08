import Link from "next/link";
import { NotesList } from "../NotesComponents/NotesList";
import { api } from "@/utils/api";

export const NotesSidebar = () => {
  const { data: lists } = api.notes.getLists.useQuery();

  return (
    <aside className="flex h-full flex-col items-start">
      <Link href={"/notes/add-new"}>add new</Link>
      {lists?.map((list) => (
        <NotesList title={list.name} data={list.notes} key={list.id} />
      ))}
    </aside>
  );
};
