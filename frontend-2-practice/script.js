"use strict";
(() => {
  const { MONTHS_NOMINATIVE, DAYS_OF_WEEK, buildCalendarGrid, compareDates, isDateSelectable, formatDate, shortDate, moveMonth } = window.KonturDates;
  // Фиксированное учебное сегодня сохраняет соответствие макету.

  const TODAY = { day: 24, month: 9, year: 2026 };
  const DEFAULT_DATE = { day: 31, month: 9, year: 2026 };
  const STANDARD_SLOTS = [{ time: '12:00', available: true }, { time: '16:00', available: true }, { time: '17:00', available: true }, { time: '18:00', available: false }];
  const ALTERNATE_SLOTS = [{ time: '11:00', available: false }, { time: '13:30', available: true }, { time: '15:00', available: true }, { time: '18:00', available: false }];
  function slotsForDate(date) {
    if (date.day === 29) return [];
    return (date.day % 2 ? STANDARD_SLOTS : ALTERNATE_SLOTS).map(slot => ({ ...slot }));
  }

  const state = { currentMonth: 9, currentYear: 2026, selectedDay: { ...DEFAULT_DATE }, selectedTime: null, slots: slotsForDate(DEFAULT_DATE) };
  const elements = {};
  function updateBottomBar() {
    elements.selection.textContent = `${formatDate(state.selectedDay)} · ${state.selectedTime || 'Выберите время'}`;
    elements.next.disabled = !state.selectedTime;
  }
  function renderCalendar() {
    elements.month.textContent = `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;
    elements.previous.disabled = state.currentYear === TODAY.year && state.currentMonth === TODAY.month;
    elements.forward.disabled = state.currentYear === 2100 && state.currentMonth === 11;
    elements.days.innerHTML = buildCalendarGrid(state.currentYear, state.currentMonth).flat().map(day => {
      if (!day) return '<span class="calendar-blank" aria-hidden="true"></span>';
      const date = { day, month: state.currentMonth, year: state.currentYear };
      const selected = compareDates(date, state.selectedDay) === 0;
      const today = compareDates(date, TODAY) === 0;
      return `<button type="button" class="calendar-day${selected ? ' is-selected' : ''}${today ? ' is-today' : ''}" data-day="${day}" aria-label="${formatDate(date)}" aria-pressed="${selected}"${isDateSelectable(day, state.currentMonth, state.currentYear, TODAY) ? '' : ' disabled'}>${day}</button>`;
    }).join('');
    elements.days.querySelectorAll('button').forEach(button => button.addEventListener('click', onDayClick));
  }
  function renderTimeSlots() {
    elements.title.textContent = `${shortDate(state.selectedDay)}, ${DAYS_OF_WEEK[new Date(state.selectedDay.year, state.selectedDay.month, state.selectedDay.day).getDay()].toLowerCase()}`;
    elements.slots.innerHTML = state.slots.length
      ? '<p class="panel-hint">Выберите время начала</p><div class="slots-list">' + state.slots.map(slot => `<button type="button" class="time-slot${state.selectedTime === slot.time ? ' is-selected' : ''}" data-time="${slot.time}" aria-pressed="${state.selectedTime === slot.time}"${slot.available ? '' : ' disabled'}>${slot.time}${slot.available ? '' : '<span class="slot-availability">занято</span>'}</button>`).join('') + '</div>'
      : '<div class="status-box"><p><strong>На этот день всё занято</strong></p><p>Выберите другую дату в календаре.</p></div>';
    elements.slots.querySelectorAll('button').forEach(button => button.addEventListener('click', onTimeSlotClick));
  }
  function onDayClick(event) {
    const day = Number(event.currentTarget.dataset.day);
    if (!isDateSelectable(day, state.currentMonth, state.currentYear, TODAY)) return;
    state.selectedDay = { day, month: state.currentMonth, year: state.currentYear };
    state.selectedTime = null;
    state.slots = slotsForDate(state.selectedDay);
    renderCalendar(); renderTimeSlots(); updateBottomBar();
    elements.days.querySelector(`[data-day="${day}"]`)?.focus({ preventScroll: true });
  }
  function onTimeSlotClick(event) {
    const time = event.currentTarget.dataset.time;
    if (!state.slots.some(slot => slot.time === time && slot.available)) return;
    state.selectedTime = time;
    renderTimeSlots(); updateBottomBar();
    elements.slots.querySelector(`[data-time="${time}"]`)?.focus({ preventScroll: true });
  }
  function changeMonth(delta) {
    const next = moveMonth(state.currentYear, state.currentMonth, delta);
    if (compareDates({ ...next, day: 1 }, { ...TODAY, day: 1 }) < 0 || next.year > 2100) return;
    state.currentMonth = next.month; state.currentYear = next.year;
    state.selectedDay = { ...next, day: next.month === TODAY.month && next.year === TODAY.year ? TODAY.day : 1 };
    state.selectedTime = null; state.slots = slotsForDate(state.selectedDay);
    renderCalendar(); renderTimeSlots(); updateBottomBar();
  }
  function init() {
    Object.assign(elements, { month: document.querySelector('#month-title'), previous: document.querySelector('#previous-month'), forward: document.querySelector('#next-month'), days: document.querySelector('#calendar-days'), title: document.querySelector('#slots-title'), slots: document.querySelector('#slots-content'), selection: document.querySelector('#selection-text'), next: document.querySelector('#continue-button') });
    elements.previous.addEventListener('click', () => changeMonth(-1));
    elements.forward.addEventListener('click', () => changeMonth(1));
    elements.next.addEventListener('click', () => {
      if (!state.selectedTime) return;
      document.querySelector('#dialog-summary').textContent = `${formatDate(state.selectedDay)} · ${state.selectedTime}`;
      document.querySelector('#booking-dialog').showModal();
    });
    renderCalendar(); renderTimeSlots(); updateBottomBar();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
