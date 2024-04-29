import { getMonthName } from "../../utils/calendar";

type HeaderProps = {
  currentDate: Date;
  onClick: (type: "PREV" | "NEXT") => void;
};

export const CalendarHeader = (props: HeaderProps) => {
  const { currentDate, onClick } = props;

  return (
    <div className="flex items-center justify-center gap-5">
      <button onClick={() => onClick("PREV")}>{"<"}</button>
      <span>{getMonthName(currentDate, "long")}</span>
      <button onClick={() => onClick("NEXT")}>{">"}</button>
    </div>
  );
};
