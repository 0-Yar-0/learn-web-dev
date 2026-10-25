import { today, getSlots } from './database.js';
import { isValidDate, compareDates } from '../src/data/date.js';

export const DELAY_MS = 600;

function sendJson(response,status,data) {
  if (response.destroyed || response.writableEnded) return;
  response.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
  response.end(JSON.stringify(data));
}

export function createBookingMiddleware({delayMs=DELAY_MS,fail=''}={}) {
  return async (request,response,next) => {
    const url = new URL(request.url,'http://localhost');
    if (!url.pathname.startsWith('/api/')) return next();
    if (request.method !== 'GET') {
      response.setHeader('Allow','GET');
      return sendJson(response,405,{message:'Разрешены только GET-запросы.'});
    }
    if (!['/api/booking/today','/api/slots'].includes(url.pathname)) return sendJson(response,404,{message:'Адрес API не найден.'});
    const kind = url.pathname === '/api/booking/today' ? 'today' : 'slots';
    let date;
    if (kind === 'slots') {
      const keys=['day','month','year'];
      const complete=keys.every(key => /^\d+$/.test(url.searchParams.get(key) ?? ''));
      date=Object.fromEntries(keys.map(key => [key,Number(url.searchParams.get(key))]));
      if (!complete || !isValidDate(date) || compareDates(date,today)<0) return sendJson(response,400,{message:'Укажите существующую дату не раньше сегодняшней.'});
    }
    await new Promise(resolve => setTimeout(resolve,Math.max(0,delayMs)));
    if (fail === kind || fail === 'all') {
      return sendJson(response,503,{message:kind==='today'?'Не удалось загрузить календарь. Попробуйте ещё раз.':'Не удалось загрузить расписание. Попробуйте ещё раз.'});
    }
    sendJson(response,200,kind==='today'?{...today}:{date,slots:getSlots(date)});
  };
}

export function bookingApiPlugin(options={}) {
  const register = server => { server.middlewares.use(createBookingMiddleware(options)); };
  return {name:'kontur-booking-api',configureServer:register,configurePreviewServer:register};
}
