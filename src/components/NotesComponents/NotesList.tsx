import { MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "../BaseComponents/Button/Button";
import { List } from "../BaseComponents/List/List";
import { ListItem } from "../BaseComponents/ListItem/ListItem";
import { useEffect, useState } from "react";

type ListProps = {
  data?: any[];
};

export const NotesList = (props: ListProps) => {
  const { data } = props;

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
        text="Lista notatek"
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
          height: isCollapsed ? "0" : "100%",
          transition: ".3s ease",
        }}
      >
        <ListItem>notatka</ListItem>
        <ListItem>notatka</ListItem>
        <ListItem>notatka</ListItem>
        <ListItem>notatka</ListItem>
        <ListItem>notatka</ListItem>
        <ListItem>notatka</ListItem>
        <ListItem>notatka</ListItem>
      </List>
    </>
  );
};
