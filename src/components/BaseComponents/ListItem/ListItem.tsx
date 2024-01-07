import { CSSProperties } from "react";
import styles from "./item.module.css";

type ListItemProps = {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
};

export const ListItem = (props: ListItemProps) => {
  const { text, children, onClick, style } = props;
  return (
    <li className={styles.listItem} onClick={onClick} style={style}>
      {children ? children : text ? text : ""}
    </li>
  );
};
