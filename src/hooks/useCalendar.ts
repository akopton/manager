import {
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  subMonths,
} from "date-fns";

type MonthObj = {
  firstDay: Date;
  lastDay: Date;
  firstDayIdx: number;
  lastDayIdx: number;
  days: Date[];
};

type ResMonth = {
  monthType: "CURRENT" | "PREV" | "NEXT";
  days: Date[];
};

export const useCalendar = (date: Date) => {
  const currentDate = date;
  const prevMonthDate = subMonths(currentDate, 1);
  const nextMonthDate = subMonths(currentDate, -1);

  const currentMonth = {
    firstDay: startOfMonth(currentDate),
    lastDay: endOfMonth(currentDate),
    firstDayIdx: getDay(startOfMonth(currentDate)),
    lastDayIdx: getDay(endOfMonth(currentDate)),
    days: eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    }),
  };

  const prevMonth = {
    firstDay: startOfMonth(prevMonthDate),
    lastDay: endOfMonth(prevMonthDate),
    firstDayIdx: getDay(startOfMonth(prevMonthDate)),
    lastDayIdx: getDay(endOfMonth(prevMonthDate)),
    days: eachDayOfInterval({
      start: startOfMonth(prevMonthDate),
      end: endOfMonth(prevMonthDate),
    }),
  };

  const nextMonth = {
    firstDay: startOfMonth(nextMonthDate),
    lastDay: endOfMonth(nextMonthDate),
    firstDayIdx: getDay(startOfMonth(nextMonthDate)),
    lastDayIdx: getDay(endOfMonth(nextMonthDate)),
    days: eachDayOfInterval({
      start: startOfMonth(nextMonthDate),
      end: endOfMonth(nextMonthDate),
    }),
  };

  const current: ResMonth = {
    monthType: "CURRENT",
    days: currentMonth.days,
  };

  const getPrevMonthDays = (currentMonth: MonthObj, prevMonth: MonthObj) => {
    if (currentMonth.firstDayIdx === 0) return prevMonth.days.slice(-6);
    if (currentMonth.firstDayIdx - 1 === 0) return prevMonth.days.slice(-7);

    return prevMonth.days.slice(-(currentMonth.firstDayIdx - 1));
  };

  const prev: ResMonth = {
    monthType: "PREV",
    days: getPrevMonthDays(currentMonth, prevMonth),
  };

  const getNextMonthDays = (currentMonth: MonthObj, nextMonth: MonthObj) =>
    nextMonth.days.slice(0, 7 - currentMonth.lastDayIdx);

  const next: ResMonth = {
    monthType: "NEXT",
    days: getNextMonthDays(currentMonth, nextMonth),
  };

  return { current, next, prev };
};
