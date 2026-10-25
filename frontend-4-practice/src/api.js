import { isValidDate, compareDates } from './data/date.js';

export async function requestJson(url,{signal}={}) {
  const response=await fetch(url,{signal,headers:{Accept:'application/json'}});
  let data;
  try { data=await response.json(); }
  catch { throw new Error('Сервер вернул ответ в неверном формате. Повторите загрузку.'); }
  if (!response.ok) throw new Error(data.message || `Ошибка сервера (${response.status}).`);
  return data;
}

export async function fetchToday({signal}={}) {
  const date=await requestJson('/api/booking/today',{signal});
  if (!isValidDate(date)) throw new Error('Сервер вернул некорректную дату.');
  return date;
}

export async function fetchSlots(date,{signal}={}) {
  const query=new URLSearchParams({day:date.day,month:date.month,year:date.year});
  const data=await requestJson(`/api/slots?${query}`,{signal});
  if (!isValidDate(data.date) || compareDates(data.date,date)!==0 || !Array.isArray(data.slots) || !data.slots.every(slot => /^\d{2}:\d{2}$/.test(slot.time)&&typeof slot.available==='boolean')) {
    throw new Error('Сервер вернул некорректное расписание.');
  }
  return data;
}
