import styles from "./select.module.css";

type TOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options?: TOption[];
  searchMode?: boolean;
  onChange: (value: string) => void;
};

export const Select = (props: SelectProps) => {
  const { options, searchMode, onChange } = props;
  return (
    <div className={styles.select}>
      <input type="text" className={styles.input} readOnly={!searchMode} />
      <ul className={styles.list}>
        {options?.map((el) => {
          return <li onClick={() => onChange(el.value)}>{el.label}</li>;
        })}
      </ul>
    </div>
  );
};
