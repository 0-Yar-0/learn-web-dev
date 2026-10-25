import { WEEKDAYS, buildCalendarGrid, compareDates, isDateSelectable, formatDate } from '../data/date.js';
export default function CalendarGrid({year,month,today,selectedDate,onDayClick}) {
  return <><div className="weekdays" aria-hidden="true">{WEEKDAYS.map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid" role="group" aria-label="Дни месяца">{buildCalendarGrid(year,month).flat().map((day,index) => {
    if (!day) return <span className="calendar-blank" key={`empty-${index}`} aria-hidden="true" />;
    const date = {day,month,year};
    const selected = compareDates(date,selectedDate) === 0;
    return <button className={`calendar-day${selected?' is-selected':''}${compareDates(date,today)===0?' is-today':''}`} key={day} type="button" disabled={!isDateSelectable(day,month,year,today)} aria-pressed={selected} aria-label={formatDate(date)} onClick={() => onDayClick(date)}>{day}</button>;
  })}</div></>;
}
