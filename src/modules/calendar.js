// (int) The current year
const THIS_YEAR = +(new Date().getFullYear());

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
const THIS_MONTH = +(new Date().getMonth()) + 1;

const WEEK_DAYS = {
  1: 'D',
  2: 'S',
  3: 'T',
  4: 'Q',
  5: 'Q',
  6: 'S',
  7: 'S',
};

const WEEK_DAYS_NAMES = {
  1: 'Domingo',
  2: 'Segunda-feira',
  3: 'Terça-feira',
  4: 'Quarta-feira',
  5: 'Quinta-feira',
  6: 'Sexta-feira',
  7: 'Sábado',
};

const CALENDAR_MONTHS = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
};

// Weeks displayed on calendar
const CALENDAR_WEEKS = 6;

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
const zeroPad = (value, length) => `${value}`.padStart(length, '0');

// (int) Number days in a month for a given year from 28 - 31
const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
      ? 30
      : 31;
};

// (int) First day of the month for a given year from 1 - 7
// 1 => Sunday, 7 => Saturday
const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1;

// (bool) Checks if a value is a date - this is just a simple check
const isDate = (date) => date
      && Object.prototype.toString.call(date) === '[object Date]'
      && !Number.isNaN(date.valueOf());

// (bool) Checks if two date values are of the same month and year
const isSameMonth = (date, basedate = new Date()) => {

  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateMonth = +(basedate.getMonth()) + 1;
  const basedateYear = basedate.getFullYear();

  const dateMonth = +(date.getMonth()) + 1;
  const dateYear = date.getFullYear();

  return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
};

// (bool) Checks if two date values are the same day
const isSameDay = (date, basedate = new Date()) => {

  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateDate = basedate.getDate();
  const basedateMonth = +(basedate.getMonth()) + 1;
  const basedateYear = basedate.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = +(date.getMonth()) + 1;
  const dateYear = date.getFullYear();

  return (+basedateDate === +dateDate)
      && (+basedateMonth === +dateMonth)
      && (+basedateYear === +dateYear);
};

// (string) Formats the given date as YYYY-MM-DD
// Months and Days are zero padded
const getDateISO = (date = new Date()) => {

  if (!isDate(date)) return null;

  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2),
  ].join('-');
};

// (string) Formats the given date as DD/MM/YYYY
// Months and Days are zero padded
const getFullDateFormated = (date = new Date()) => {

  if (!isDate(date)) return null;

  return [
    zeroPad(+date.getDate(), 2),
    zeroPad(+date.getMonth() + 1, 2),
    date.getFullYear(),
  ].join('/');
};

// (string) Formats the given date as MM-DD
// Months and Days are zero padded
const getDateFormated = (date = new Date()) => {

  if (!isDate(date)) return null;

  return [
    zeroPad(+date.getDate(), 2),
    zeroPad(+date.getMonth() + 1, 2),
  ].join('/');
};

// (string) Formats the given date as DD-MM-YYYY - HH:mm.
// Months, days, hours and minutes are zero padded.
const getDateAndTime = (date = new Date()) => {
  if (!isDate(date)) return null;

  const day = zeroPad(date.getDate(), 2);
  const month = zeroPad(date.getMonth() + 1, 2);
  const year = date.getFullYear();
  const hours = zeroPad(date.getHours(), 2);
  const mins = zeroPad(date.getMinutes(), 2);

  return `${day}/${month}/${year} – ${hours}:${mins}`;
};

// (string) Formats the given date.
const getFullDate = (date = new Date()) => {
  if (!isDate(date)) return null;

  return `${date.getDate()} de ${CALENDAR_MONTHS[date.getMonth() + 1]} de ${date.getFullYear()}`;
};

// (string) Formats the given date.
const getMonthAndYear = (date = new Date()) => {
  if (!isDate(date)) return null;

  return `${CALENDAR_MONTHS[date.getMonth() + 1]} de ${date.getFullYear()}`;
};

// ({month, year}) Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
const getPreviousMonth = (month, year) => {
  const prevMonth = (month > 1) ? month - 1 : 12;
  const prevMonthYear = (month > 1) ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

// ({month, year}) Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
const getNextMonth = (month, year) => {
  const nextMonth = (month < 12) ? month + 1 : 1;
  const nextMonthYear = (month < 12) ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

// Calendar builder for a month in the specified year
// Returns an array of the calendar dates.
// Each calendar date is represented as an array => [YYYY, MM, DD]
const builder = (month = THIS_MONTH, year = THIS_YEAR) => {

  // Get number of days in the month and the month's first day
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays);

  // Get the previous and next months and years
  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  // Get number of days in previous month
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  // Builds dates to be displayed from previous month
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });

  // Builds dates to be displayed from current month
  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  // Builds dates to be displayed from next month
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

export {
  THIS_YEAR,
  THIS_MONTH,
  WEEK_DAYS,
  WEEK_DAYS_NAMES,
  CALENDAR_MONTHS,
  CALENDAR_WEEKS,
  zeroPad,
  getMonthDays,
  getMonthFirstDay,
  isDate,
  isSameMonth,
  isSameDay,
  getDateISO,
  getDateAndTime,
  getFullDate,
  getMonthAndYear,
  getPreviousMonth,
  getNextMonth,
  getDateFormated,
  getFullDateFormated,
};

export default builder;
