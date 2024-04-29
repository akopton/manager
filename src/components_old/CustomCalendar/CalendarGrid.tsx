import { CalendarGridHeader } from "./CalendarGridHeader";
import { CalendarGridItem } from "./CalendarGridItem";

type Month = {
  monthType: "CURRENT" | "PREV" | "NEXT";
  days: Date[];
};

type CalendarGridProps = {
  items: Month[];
};

export const CalendarGrid = ({ items }: CalendarGridProps) => {
  return (
    <div className="grid grid-cols-7 gap-2">
      <CalendarGridHeader />
      {items.map((month) =>
        month.days.map((day) => (
          <CalendarGridItem
            date={day}
            monthType={month.monthType}
            key={day.getTime()}
          />
        )),
      )}
    </div>
  );
};
