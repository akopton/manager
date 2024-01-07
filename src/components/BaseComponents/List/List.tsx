import styles from "./list.module.css";

type HeightUnit = "%" | "px" | "em" | "vh";
type ListProps = {
  children?: React.ReactNode;
  direction?: "row" | "column";
  gap?: `${number}${HeightUnit}`;
  style?: React.CSSProperties;
};

export const List = (props: ListProps) => {
  const { children, direction, gap, style } = props;
  return (
    <ul
      className={styles.list}
      style={{
        display: "flex",
        flexDirection: direction,
        gap: gap,
        ...style,
      }}
    >
      {children}
    </ul>
  );
};
