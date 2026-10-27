# Занятие 2 — API категорий услуг

Реализованы оба задания на FastAPI: список категорий с количеством услуг и информация об одной категории. Исходного приложения в папке не было, поэтому создан самостоятельный проект.

## Запуск

Требуется Python 3.10 или новее. Команды выполняются внутри этой папки.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-lock.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

На Linux/macOS вместо `.\.venv\Scripts\python.exe` используйте `.venv/bin/python`.
`requirements.txt` закрепляет прямые зависимости, `requirements-lock.txt` — также их зависимости. Для выполнения тестов HTTPX2 уже включён.

Откройте http://127.0.0.1:8000/docs — интерактивное описание API. Схема OpenAPI: http://127.0.0.1:8000/openapi.json.

Тесты:
```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

## Endpoint

| Метод | Адрес | Результат |
| --- | --- | --- |
| GET | /categories | 200, массив категорий |
| GET | /categories/1 | 200, одна категория |
| GET | /categories/999 | 404, текст `Category not found` |

Пример категории:
```json
{"id":1,"name":"Стрижки и укладки","servicesCount":5}
```

В справочниках четыре категории и 18 услуг. Поле `servicesCount` вычисляется из `category_id` услуг, а не записано вручную в endpoint. Существующие категории возвращают ту же структуру в списке и в деталях. Для неизвестных числовых ID, включая 0 и отрицательные, возвращается 404; для нечислового ID — 422.

## Структура

- `app/data.py` — dataclass категорий и услуг, учебные данные.
- `app/schemas.py` — схема ответа.
- `app/categories.py` — два endpoint и расчёт счётчика.
- `app/main.py` — приложение FastAPI.
- `tests/test_categories.py` — пять тестов.

Все данные этого занятия хранятся в памяти. Перенос мастеров в БД выполнен отдельно в третьей практике.
