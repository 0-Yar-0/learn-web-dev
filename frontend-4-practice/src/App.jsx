import { useState, useEffect } from 'react';
import BookingPage from './components/BookingPage.jsx';
import { fetchToday, fetchSlots } from './api.js';
import { isDateSelectable, compareDates, moveMonth } from './data/date.js';

export default function App() {
  const [today,setToday]=useState(null);
  const [currentMonth,setCurrentMonth]=useState(null);
  const [currentYear,setCurrentYear]=useState(null);
  const [selectedDay,setSelectedDay]=useState(null);
  const [selectedTime,setSelectedTime]=useState(null);
  const [slots,setSlots]=useState([]);
  const [todayLoading,setTodayLoading]=useState(true);
  const [todayError,setTodayError]=useState('');
  const [slotsLoading,setSlotsLoading]=useState(false);
  const [slotsError,setSlotsError]=useState('');
  const [todayAttempt,setTodayAttempt]=useState(0);
  const [slotsAttempt,setSlotsAttempt]=useState(0);

  useEffect(() => {
    const controller=new AbortController();
    let active=true;
    setTodayLoading(true); setTodayError('');
    fetchToday({signal:controller.signal}).then(date => {
      if (!active) return;
      // Выбираем последний день полученного месяца: 31 октября в учебных данных.
      const initial={...date,day:new Date(date.year,date.month+1,0).getDate()};
      setToday(date); setCurrentMonth(date.month); setCurrentYear(date.year);
      setSelectedTime(null); setSlots([]); setSlotsLoading(true); setSelectedDay(initial);
    }).catch(error => {
      if (active&&error.name!=='AbortError') setTodayError(error.message || 'Не удалось загрузить календарь.');
    }).finally(() => { if (active) setTodayLoading(false); });
    return () => {active=false;controller.abort();};
  },[todayAttempt]);

  useEffect(() => {
    if (!selectedDay) return;
    const controller=new AbortController();
    let active=true;
    setSlotsLoading(true); setSlotsError(''); setSlots([]);
    fetchSlots(selectedDay,{signal:controller.signal}).then(data => {
      // Отмена запроса и проверка date защищают от ответов в неверном порядке.
      if (active&&compareDates(data.date,selectedDay)===0) setSlots(data.slots);
    }).catch(error => {
      if (active&&error.name!=='AbortError') setSlotsError(error.message || 'Не удалось загрузить расписание.');
    }).finally(() => { if (active) setSlotsLoading(false); });
    return () => {active=false;controller.abort();};
  },[selectedDay,slotsAttempt]);

  function handleDayClick(date) {
    if (!today||!isDateSelectable(date.day,date.month,date.year,today)) return;
    if (selectedDay&&compareDates(date,selectedDay)===0) return;
    setSelectedTime(null); setSlots([]); setSlotsLoading(true); setSlotsError(''); setSelectedDay(date);
  }
  function handleMonthChange(delta) {
    const next=moveMonth(currentYear,currentMonth,delta);
    if (compareDates({...next,day:1},{...today,day:1})<0||next.year>2100) return;
    setCurrentYear(next.year);setCurrentMonth(next.month);
    handleDayClick({...next,day:next.month===today.month&&next.year===today.year?today.day:1});
  }
  function handleTimeSelect(time) {
    if (!slotsLoading&&!slotsError&&slots.some(slot => slot.time===time&&slot.available)) setSelectedTime(time);
  }
  function retrySlots() {setSelectedTime(null);setSlotsLoading(true);setSlotsAttempt(value => value+1);}

  return <BookingPage today={today} currentYear={currentYear} currentMonth={currentMonth} selectedDate={selectedDay} selectedTime={selectedTime} slots={slots} onDayClick={handleDayClick} onMonthChange={handleMonthChange} onTimeSelect={handleTimeSelect} loading={slotsLoading} error={slotsError} onRetry={retrySlots} initialLoading={todayLoading} initialError={todayError} onInitialRetry={() => setTodayAttempt(value => value+1)} />;
}
