import clsx from "clsx";
import { format } from "date-fns";

export const CalendarGridItem = (props: {
  date: Date;
  monthType: "PREV" | "CURRENT" | "NEXT";
}) => {
  const { date, monthType } = props;

  return (
    <button
      className={clsx("border text-center", {
        "text-red-500": monthType === "PREV" || monthType === "NEXT",
      })}
      onClick={() => console.log(date)}
    >
      {format(date, "d")}
    </button>
  );
};
