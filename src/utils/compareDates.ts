const getDateParts = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return { day, month, year };
};

export const compareDates = (date1: Date, date2: Date): number => {
  const { day: day1, month: month1, year: year1 } = getDateParts(date1);
  const { day: day2, month: month2, year: year2 } = getDateParts(date2);

  if (year1 !== year2) {
    return year1 - year2;
  }

  if (month1 !== month2) {
    return month1 - month2;
  }

  return day1 - day2;
};
