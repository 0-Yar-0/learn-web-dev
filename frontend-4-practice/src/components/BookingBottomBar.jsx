import { formatDate } from '../data/date.js';
export default function BookingBottomBar({date,time,loading,error}) {
  return <section className="selection-bar" aria-label="Выбранная дата и время" aria-live="polite"><span className="eyebrow">Выбрано</span><p className="selection-text">{formatDate(date)} · {loading?'Загрузка слотов…':error?'Время недоступно':time||'Выберите время'}</p></section>;
}
