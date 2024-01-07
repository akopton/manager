import styles from "./list.module.css";

type ListProps = {
  children?: React.ReactNode;
  direction?: "row" | "column";
};

export const List = (props: ListProps) => {
  const { children, direction } = props;
  return (
    <ul
      className={styles.list}
      style={direction && { flexDirection: direction }}
    >
      {children}
    </ul>
  );
};
