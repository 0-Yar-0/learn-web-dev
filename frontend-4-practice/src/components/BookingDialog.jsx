import { formatDate } from '../data/date.js';
export default function BookingDialog({dialogRef,date,time}) {
  return <dialog className="booking-dialog" ref={dialogRef} aria-labelledby="dialog-title"><h2 className="dialog-title" id="dialog-title">Время выбрано</h2><p className="dialog-copy">{date&&formatDate(date)} · {time}</p><p className="dialog-copy">Мужская стрижка · Алексей Морозов · 1 200 ₽</p><p className="summary-detail">Это учебная демонстрация. Запись в салон не отправляется.</p><form method="dialog" className="dialog-actions"><button className="button button--primary">Вернуться к календарю</button></form></dialog>;
}
