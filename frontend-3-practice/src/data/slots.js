const TODAY = {day:24,month:9,year:2026};
const DEFAULT_DATE = {day:31,month:9,year:2026};
const STANDARD_SLOTS = [{time:'12:00',available:true},{time:'16:00',available:true},{time:'17:00',available:true},{time:'18:00',available:false}];
const ALTERNATE_SLOTS = [{time:'11:00',available:false},{time:'13:30',available:true},{time:'15:00',available:true},{time:'18:00',available:false}];
function slotsForDate(date) {
  if (date.day === 29) return [];
  return (date.day % 2 ? STANDARD_SLOTS : ALTERNATE_SLOTS).map(slot => ({...slot}));
}

export { TODAY, DEFAULT_DATE, slotsForDate };
