import { useRef } from 'react';
import { compareDates, DAYS_OF_WEEK, shortDate } from '../data/date.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import BookingSteps from './BookingSteps.jsx';
import ServiceSummary from './ServiceSummary.jsx';
import CalendarHeader from './CalendarHeader.jsx';
import CalendarGrid from './CalendarGrid.jsx';
import TimeSlots from './TimeSlots.jsx';
import BookingBottomBar from './BookingBottomBar.jsx';
import BookingDialog from './BookingDialog.jsx';

export default function BookingPage({today,currentYear,currentMonth,selectedDate,selectedTime,slots,onDayClick,onMonthChange,onTimeSelect,loading=false,error='',onRetry,initialLoading=false,initialError='',onInitialRetry}) {
  const dialogRef = useRef(null);
  return <><Header /><main className="container booking-main" id="booking"><BookingSteps /><h1 className="page-title">Выберите удобное время</h1><p className="page-description">Время местное для салона · Москва.</p>
    {initialLoading ? <div className="panel status-box" role="status"><span className="spinner" aria-hidden="true" /><p>Загрузка календаря…</p></div> : initialError ? <div className="panel status-box" role="alert"><p className="error-message">{initialError}</p><button className="button" onClick={onInitialRetry}>Повторить загрузку календаря</button></div> : today&&selectedDate&&<div className="booking-layout"><div className="booking-column"><div className="schedule-grid">
      <section className="panel calendar-card" aria-labelledby="month-title"><CalendarHeader year={currentYear} month={currentMonth} canGoBack={compareDates({day:1,month:currentMonth,year:currentYear},{...today,day:1})>0} onMonthChange={onMonthChange} /><p className="panel-hint">Выберите удобный день для визита</p><CalendarGrid year={currentYear} month={currentMonth} today={today} selectedDate={selectedDate} onDayClick={onDayClick} /><p className="calendar-legend">Рамка — сегодня · Оранжевый — выбранная дата</p></section>
      <section className="panel slots-card" aria-labelledby="slots-title" aria-busy={loading}><h2 className="panel-title slots-title" id="slots-title">{shortDate(selectedDate)}, {DAYS_OF_WEEK[new Date(selectedDate.year,selectedDate.month,selectedDate.day).getDay()].toLowerCase()}</h2><div aria-live="polite"><TimeSlots slots={slots} selectedTime={selectedTime} onSelect={onTimeSelect} loading={loading} error={error} onRetry={onRetry} /></div></section>
    </div><BookingBottomBar date={selectedDate} time={selectedTime} loading={loading} error={error} /><div className="booking-actions"><a className="button" href="#service-summary">← К услугам</a><button className="button button--primary" type="button" disabled={!selectedTime||loading||Boolean(error)} onClick={() => dialogRef.current.showModal()}>Продолжить</button></div></div><ServiceSummary /></div>}
    <BookingDialog dialogRef={dialogRef} date={selectedDate} time={selectedTime} /></main><Footer /></>;
}
