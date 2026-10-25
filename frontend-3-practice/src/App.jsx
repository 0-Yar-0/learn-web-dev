import { useState } from 'react';
import BookingPage from './components/BookingPage.jsx';
import { TODAY, DEFAULT_DATE, slotsForDate } from './data/slots.js';
import { isDateSelectable, compareDates, moveMonth } from './data/date.js';

export default function App() {
  const [currentMonth,setCurrentMonth] = useState(DEFAULT_DATE.month);
  const [currentYear,setCurrentYear] = useState(DEFAULT_DATE.year);
  const [selectedDay,setSelectedDay] = useState(DEFAULT_DATE);
  const [selectedTime,setSelectedTime] = useState(null);
  const [slots,setSlots] = useState(() => slotsForDate(DEFAULT_DATE));
  function handleDayClick(date) {
    if (!isDateSelectable(date.day,date.month,date.year,TODAY)) return;
    setSelectedDay(date); setSelectedTime(null); setSlots(slotsForDate(date));
  }
  function handleMonthChange(delta) {
    const next = moveMonth(currentYear,currentMonth,delta);
    if (compareDates({...next,day:1},{...TODAY,day:1})<0 || next.year>2100) return;
    setCurrentYear(next.year); setCurrentMonth(next.month);
    handleDayClick({...next,day:next.year===TODAY.year&&next.month===TODAY.month?TODAY.day:1});
  }
  function handleTimeSelect(time) {
    if (slots.some(slot => slot.time===time&&slot.available)) setSelectedTime(time);
  }
  return <BookingPage today={TODAY} currentYear={currentYear} currentMonth={currentMonth} selectedDate={selectedDay} selectedTime={selectedTime} slots={slots} onDayClick={handleDayClick} onMonthChange={handleMonthChange} onTimeSelect={handleTimeSelect} />;
}
