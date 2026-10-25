// month: 0 = январь, 9 = октябрь. Учебная дата соответствует макету.
export const today = Object.freeze({day:24,month:9,year:2026});
export const standardSlots = [
  {time:'12:00',available:true},
  {time:'16:00',available:true},
  {time:'17:00',available:true},
  {time:'18:00',available:false},
];
export const alternateSlots = [
  {time:'11:00',available:false},
  {time:'13:30',available:true},
  {time:'15:00',available:true},
  {time:'18:00',available:false},
];
export function getSlots(date) {
  // 29 число — воспроизводимый сценарий отсутствия свободного времени.
  if (date.day === 29) return [];
  return (date.day % 2 ? standardSlots : alternateSlots).map(slot => ({...slot}));
}
