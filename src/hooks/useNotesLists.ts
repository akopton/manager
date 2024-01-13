import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export const useNotesLists = () => {
  const {
    query: { listId },
  } = useRouter();

  const { data: lists } = api.notes.getLists.useQuery();

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

  return { lists: mappedLists, openList };
};
