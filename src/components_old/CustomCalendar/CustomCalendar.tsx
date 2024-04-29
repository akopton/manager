import { useCalendar } from "@/hooks/useCalendar";
import { subMonths } from "date-fns";
import { useState } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

type CalendarProps = {
  selectedDates: Date[];
  datesView?: boolean;
  datesViewSide?: "left" | "right";
  onDateHover: () => void;
  onDateSelected: () => void;
};

export const CustomCalendar = (props: CalendarProps) => {
  const { selectedDates, onDateHover, onDateSelected } = props;
  const [current, setCurrent] = useState(new Date());

  const {
    current: currentMonth,
    prev: prevMonth,
    next: nextMonth,
  } = useCalendar(current);

  const handleClick = (type: "PREV" | "NEXT") => {
    type === "PREV"
      ? setCurrent((prev) => subMonths(prev, 1))
      : setCurrent((prev) => subMonths(prev, -1));
  };

  return (
    <div className="flex h-full w-full flex-col gap-5 border-2 p-5">
      {/* {datesView && <div></div>} */}
      <CalendarHeader onClick={handleClick} currentDate={current} />
      <CalendarGrid items={[prevMonth, currentMonth, nextMonth]} />
    </div>
  );
};
