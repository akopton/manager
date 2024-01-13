import { MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "../BaseComponents/Button/Button";
import { List } from "../BaseComponents/List/List";
import { ListItem } from "../BaseComponents/ListItem/ListItem";
import { useCallback, useEffect, useState } from "react";
import { Note } from "@prisma/client";
import Link from "next/link";

type ListProps = {
  id: string;
  title: string;
  data?: Note[];
  isOpened?: boolean;
  openList?: (id?: string) => void;
};

export const NotesList = (props: ListProps) => {
  const { data, title, id, isOpened, openList } = props;
  const [showScrollbar, setShowScrollbar] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (openList) {
      !isOpened ? openList(id) : openList();
    }
  }, [openList]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpened) {
      timeout = setTimeout(() => setShowScrollbar(true), 300);
    }

    return () => {
      clearTimeout(timeout);
      setShowScrollbar(false);
    };
  }, [isOpened]);

  return (
    <>
      <Button
        type="button"
        text={title}
        icon={
          <div
            style={{
              transform: !isOpened ? "rotate(0deg)" : "rotate(180deg)",
              transition: ".3s ease",
            }}
          >
            <MdKeyboardArrowDown />
          </div>
        }
        onClick={handleClick}
        style={{
          fontSize: "1.7rem",
          border: "none",
        }}
      />
      <List
        direction="column"
        style={{
          overflow: showScrollbar ? "auto" : "hidden",
          height: "100%",
          maxHeight: isOpened ? "100%" : "0",
          transition: "max-height .3s ease",
          width: "100%",
        }}
      >
        {data?.map((note) => (
          <ListItem key={note.id}>
            <Link
              href={{
                pathname: `/notes/${note.id}`,
                query: {
                  id: note.id,
                  listId: id,
                },
              }}
              as={`/notes/${note.id}`}
            >
              <div className="flex flex-col border-2 px-2 py-1">
                <span className="text-2xl">{note.title}</span>
                <span className="text-lg">{note.text}</span>
              </div>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};
