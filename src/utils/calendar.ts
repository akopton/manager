import { getDay, getMonth } from "date-fns";

type NamesType = {
  [key: number]: { short: string; long: string };
};

type ReturnType = "short" | "long";

const DAYS_NAMES_PL: NamesType = {
  0: { short: "Pon", long: "Poniedziałek" },
  1: { short: "Wto", long: "Wtorek" },
  2: { short: "Śro", long: "Środa" },
  3: { short: "Czw", long: "Czwartek" },
  4: { short: "Pią", long: "Piątek" },
  5: { short: "Sob", long: "Sobota" },
  6: { short: "Nie", long: "Niedziela" },
};

const MONTH_NAMES_PL: NamesType = {
  0: { short: "Sty", long: "Styczeń" },
  1: { short: "Lut", long: "Luty" },
  2: { short: "Mar", long: "Marzec" },
  3: { short: "Kwi", long: "Kwiecień" },
  4: { short: "Maj", long: "Maj" },
  5: { short: "Cze", long: "Czerwiec" },
  6: { short: "Lip", long: "Lipiec" },
  7: { short: "Sie", long: "Sierpień" },
  8: { short: "Wrz", long: "Wrzesień" },
  9: { short: "Paź", long: "Październik" },
  10: { short: "Lis", long: "Listopad" },
  11: { short: "Gru", long: "Grudzień" },
};

export const getMonthName = (date: Date, type: ReturnType) =>
  MONTH_NAMES_PL[getMonth(date)]?.[type];

export const getDayName = (date: Date, type: ReturnType) =>
  DAYS_NAMES_PL[getDay(date)]?.[type];

export const getDaysArray = (type: ReturnType) =>
  Object.values(DAYS_NAMES_PL).map((day) => day[type]);
