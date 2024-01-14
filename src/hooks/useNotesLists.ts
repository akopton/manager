import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export const useNotesLists = () => {
  const { data: lists } = api.notes.getLists.useQuery();
  const { mutateAsync: addList } = api.notes.addList.useMutation();
  const refetchLists = api.notes.getLists.useQuery().refetch;

  const {
    query: { listId },
  } = useRouter();

  const [openedList, setOpenedList] = useState<string | undefined>(
    listId as string,
  );

  const mappedLists = useMemo(() => {
    const newLists = lists?.map((list) => ({ ...list, isOpened: false }));
    if (newLists && openedList) {
      return newLists.map((list) =>
        list.id === openedList
          ? { ...list, isOpened: true }
          : { ...list, isOpened: false },
      );
    } else {
      return newLists;
    }
  }, [lists, openedList]);

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
