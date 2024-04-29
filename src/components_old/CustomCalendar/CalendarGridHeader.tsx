import { getDaysArray } from "../../utils/calendar";

export const CalendarGridHeader = () => {
  const WEEKDAYS = getDaysArray("short");

  return (
    <>
      {WEEKDAYS.map((day) => (
        <div className="border text-center" key={day}>
          {day}
        </div>
      ))}
    </>
  );
};
