const MONTHS_NOMINATIVE = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTHS_GENITIVE = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const DAYS_OF_WEEK = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const WEEKDAYS = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];

function buildCalendarGrid(year, month) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({length: Math.ceil((firstWeekday + count) / 7) * 7}, (_, i) => {
    const day = i - firstWeekday + 1;
    return day > 0 && day <= count ? day : null;
  });
  return Array.from({length: cells.length / 7}, (_, i) => cells.slice(i * 7, i * 7 + 7));
}
function compareDates(a, b) {
  return Math.sign(Date.UTC(a.year, a.month, a.day) - Date.UTC(b.year, b.month, b.day));
}
function isValidDate(date) {
  if (!date || !['day','month','year'].every(key => Number.isInteger(date[key]))) return false;
  if (date.year < 1900 || date.year > 2100 || date.month < 0 || date.month > 11) return false;
  const value = new Date(date.year, date.month, date.day);
  return value.getFullYear() === date.year && value.getMonth() === date.month && value.getDate() === date.day;
}
function isDateSelectable(day, month, year, today) {
  const date = {day,month,year};
  return isValidDate(date) && compareDates(date, today) >= 0;
}
function formatDate(date) {
  return `${DAYS_OF_WEEK[new Date(date.year,date.month,date.day).getDay()]}, ${date.day} ${MONTHS_GENITIVE[date.month]} ${date.year}`;
}
function shortDate(date) { return `${date.day} ${MONTHS_GENITIVE[date.month]}`; }
function dateKey(date) { return `${date.year}-${String(date.month + 1).padStart(2,'0')}-${String(date.day).padStart(2,'0')}`; }
function moveMonth(year, month, delta) {
  const date = new Date(year, month + delta, 1);
  return {year:date.getFullYear(),month:date.getMonth()};
}

export { MONTHS_NOMINATIVE, MONTHS_GENITIVE, DAYS_OF_WEEK, WEEKDAYS, buildCalendarGrid, compareDates, isValidDate, isDateSelectable, formatDate, shortDate, dateKey, moveMonth };
