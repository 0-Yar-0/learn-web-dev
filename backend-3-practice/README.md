# Занятие 3 — мастера в SQLite через SQLAlchemy

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

## База данных

При первом запуске автоматически создаются `data/salon.sqlite3` и таблица `masters`. Путь вычисляется относительно проекта и не зависит от каталога, из которого запущена команда.

Модель находится в `app/models.py`: `id` — целочисленный первичный ключ, `name` и `specialization` — обязательные строки. Для специализации создаётся индекс. В пустую таблицу добавляются две учебные записи:

| id | name | specialization |
| --- | --- | --- |
| 1 | Анна | Парикмахер |
| 2 | Мария | Визажист |

Повторный запуск не пересоздаёт таблицу и не перезаписывает данные. Начальное заполнение выполняется только при пустой таблице. Список мастеров не хранится в Python: endpoint выполняют запросы к SQLite через ORM. Сессия создаётся на запрос и закрывается после него.

## Endpoint

| Метод | Адрес | Результат |
| --- | --- | --- |
| GET | /masters | Список мастеров по id |
| GET | /masters?specialization=Парикмахер | Точное совпадение специализации |
| GET | /masters/1 | Один мастер |
| GET | /masters/999 | 404, `{"detail":"Master not found"}` |
| GET | /categories | Категории с количеством услуг |
| GET | /categories/1 | Одна категория |

Неизвестная специализация возвращает `[]` с кодом 200. Фильтр регистрозависимый, применяется как параметризованное условие SQLAlchemy. Ошибка преобразования ID в число — 422; неизвестный числовой ID — 404.

Для запроса фильтра в PowerShell:
```powershell
curl.exe --get --data-urlencode "specialization=Парикмахер" http://127.0.0.1:8000/masters
```

## Структура

- `app/models.py` — ORM-модель.
- `app/database.py` — engine, создание таблицы, начальные данные, сессии.
- `app/masters.py` — endpoint мастеров.
- `app/schemas.py` — схемы ответов, включая сериализацию ORM через `from_attributes`.
- `app/main.py` — фабрика приложения, lifespan и подключение маршрутов.

Фабрика `create_app(database_path, seed=False)` позволяет запустить приложение с отдельной пустой БД. В обычном запуске используется `app.main:app` с начальными записями.
