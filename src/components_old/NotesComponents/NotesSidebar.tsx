import { NotesList } from "./NotesList";
import { Button } from "../../components/BaseComponents/Button/Button";
import { AddNotesListForm } from "../Forms/AddNotesListForm";
import { useNotesLists } from "@/hooks/useNotesLists";
import { useState } from "react";
import { useRouter } from "next/router";

export const NotesSidebar = () => {
  const router = useRouter();
  const { lists, openList } = useNotesLists();
  const [isFormOpened, setIsFormOpened] = useState(false);

  const openForm = () => {
    setIsFormOpened((prev) => !prev);
  };

  return (
    <aside className="flex h-full flex-col items-start ">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <Button type="button" text="Dodaj listę" onClick={openForm} />
          <Button
            type="button"
            text="Dodaj notatkę"
            onClick={() => router.push("/notes/add-new")}
          />
        </div>
        {isFormOpened && (
          <AddNotesListForm closeForm={() => setIsFormOpened(false)} />
        )}
      </div>
      {lists?.map((list) => (
        <NotesList
          id={list.id}
          title={list.name}
          data={list.notes}
          key={list.id}
          openList={openList}
          isOpened={list.isOpened}
        />
      ))}
    </aside>
  );
};
