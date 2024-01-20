import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export const useNotesLists = () => {
  const session = useSession();
  const { data: sharedNotes } = api.notes.getSharedNotesForUser.useQuery(
    session.data?.user.id as string,
  );
  const { data: lists } = api.notesList.getLists.useQuery();
  const { mutateAsync: addList } = api.notesList.addList.useMutation();
  const refetchLists = api.notesList.getLists.useQuery().refetch;

  const {
    query: { listId },
  } = useRouter();

  const [openedList, setOpenedList] = useState<string | undefined>(
    listId as string,
  );

  const populatedLists = useMemo(() => {
    if (sharedNotes) {
      return lists?.map((list) => {
        if (list.name === "Udostępnione") {
          return { ...list, notes: [...list.notes, ...sharedNotes] };
        } else {
          return list;
        }
      });
    } else return lists;
  }, [lists, sharedNotes]);

  const mappedLists = useMemo(() => {
    const newLists = populatedLists?.map((list) => ({
      ...list,
      isOpened: false,
    }));
    if (newLists && openedList) {
      return newLists.map((list) =>
        list.id === openedList
          ? { ...list, isOpened: true }
          : { ...list, isOpened: false },
      );
    } else {
      return newLists;
    }
  }, [populatedLists, openedList]);

  const openList = (id?: string) => {
    setOpenedList(id);
  };

  const addNewList = async (name: string) => {
    await toast.promise(addList(name), {
      success: {
        render() {
          return "Pomyślnie dodano listę!";
        },
      },
      error: {
        render() {
          return "Lista o podanej nazwie już istnieje!";
        },
      },
    });

    await refetchLists();
  };

  return { lists: mappedLists, openList, addNewList };
};
