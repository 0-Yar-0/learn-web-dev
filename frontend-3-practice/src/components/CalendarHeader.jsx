import { MONTHS_NOMINATIVE } from '../data/date.js';
export default function CalendarHeader({year,month,canGoBack,onMonthChange}) {
  return <div className="calendar-header"><h2 className="panel-title" id="month-title">{MONTHS_NOMINATIVE[month]} {year}</h2><div className="month-navigation"><button className="month-arrow" type="button" aria-label="Предыдущий месяц" disabled={!canGoBack} onClick={() => onMonthChange(-1)}>‹</button><button className="month-arrow" type="button" aria-label="Следующий месяц" disabled={year===2100&&month===11} onClick={() => onMonthChange(1)}>›</button></div></div>;
}
