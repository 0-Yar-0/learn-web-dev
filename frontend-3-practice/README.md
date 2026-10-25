# Задание 3 — Основы React

Та же страница переписана на React. Отдельные файлы компонентов: Header, Footer, BookingSteps, CalendarHeader, CalendarGrid, TimeSlots, BookingBottomBar, ServiceSummary, BookingDialog и BookingPage. Состояние хранится в useState: месяц, год, выбранная дата, время и слоты. Списки строятся через map с key; обработчики задаются через JSX. При смене даты время сбрасывается; прошлые дни и занятые слоты заблокированы. Реализованы навигация месяцев, нижняя панель и сводка выбора.

## Запуск

Требуется Node.js 22.12+ (или 20.19+).
Из этой папки выполните:
```sh
npm install
npm run dev
```
Откройте адрес из терминала (по умолчанию http://127.0.0.1:3000).
Для точного воспроизведения дерева зависимостей можно использовать pnpm:
```sh
pnpm install --frozen-lockfile
pnpm dev
```
Проверка и сборка:
```sh
npm test
npm run build
npm run preview
```

## Данные и макет

Экран из учебного проекта «Контур». Макет: https://www.figma.com/design/ZpkkCic8gGMsrm244NVDWQ