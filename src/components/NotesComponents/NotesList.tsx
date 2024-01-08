import { MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "../BaseComponents/Button/Button";
import { List } from "../BaseComponents/List/List";
import { ListItem } from "../BaseComponents/ListItem/ListItem";
import { useEffect, useState } from "react";
import { Note } from "@prisma/client";

type ListProps = {
  title: string;
  data?: Note[];
};

export const NotesList = (props: ListProps) => {
  const { data, title } = props;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [showScrollbar, setShowScrollbar] = useState<boolean>(false);

  const handleClick = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isCollapsed) {
      timeout = setTimeout(() => setShowScrollbar(true), 300);
    }

    return () => {
      clearTimeout(timeout);
      setShowScrollbar(false);
    };
  }, [isCollapsed]);

  return (
    <>
      <Button
        type="button"
        text={title}
        icon={
          <div
            style={{
              transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
              transition: ".3s ease",
            }}
          >
            <MdKeyboardArrowDown />
          </div>
        }
        onClick={handleClick}
      />
      <List
        direction="column"
        style={{
          overflow: showScrollbar ? "auto" : "hidden",
          height: isCollapsed ? "0" : "fit-content",
          maxHeight: isCollapsed ? "0" : "100%",
          transition: ".3s ease",
        }}
      >
        {data?.map((note) => <ListItem text={note.title} />)}
      </List>
    </>
  );
};
