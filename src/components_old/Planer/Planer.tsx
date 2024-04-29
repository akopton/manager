import { DaysList } from "./DaysList";
import { PlanerCalendar } from "./PlanerCalendar";

export const Planer = () => {
  return (
    <div className="col-span-2 flex items-center gap-5 rounded-2xl border-2 p-5">
      <DaysList />
      <PlanerCalendar />
    </div>
  );
};
