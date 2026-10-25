export default function TimeSlots({slots,selectedTime,onSelect,loading=false,error='',onRetry}) {
  if (loading) return <div className="status-box" role="status"><span className="spinner" aria-hidden="true" /><p>Загрузка слотов…</p></div>;
  if (error) return <div className="status-box" role="alert"><p className="error-message">{error}</p><button className="button" type="button" onClick={onRetry}>Повторить загрузку слотов</button></div>;
  if (!slots.length) return <div className="status-box"><p><strong>На этот день всё занято</strong></p><p>Выберите другую дату в календаре.</p></div>;
  return <><p className="panel-hint">Выберите время начала</p><div className="slots-list">{slots.map(slot => <button className={`time-slot${selectedTime===slot.time?' is-selected':''}`} type="button" key={slot.time} disabled={!slot.available} aria-pressed={selectedTime===slot.time} onClick={() => onSelect(slot.time)}>{slot.time}{!slot.available&&<span className="slot-availability">занято</span>}</button>)}</div></>;
}
