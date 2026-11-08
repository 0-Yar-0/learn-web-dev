from dataclasses import dataclass


@dataclass(frozen=True)
class Category:
    id: int
    name: str


@dataclass(frozen=True)
class Service:
    id: int
    name: str
    category_id: int


categories = [
    Category(1, 'Стрижки и укладки'),
    Category(2, 'Маникюр и педикюр'),
    Category(3, 'Брови и ресницы'),
    Category(4, 'Спа-процедуры'),
]

services = [
    Service(1, 'Мужская стрижка', 1),
    Service(2, 'Женская стрижка', 1),
    Service(3, 'Детская стрижка', 1),
    Service(4, 'Укладка волос', 1),
    Service(5, 'Оформление бороды', 1),
    Service(6, 'Классический маникюр', 2),
    Service(7, 'Аппаратный маникюр', 2),
    Service(8, 'Покрытие гель-лаком', 2),
    Service(9, 'Классический педикюр', 2),
    Service(10, 'Аппаратный педикюр', 2),
    Service(11, 'Коррекция бровей', 3),
    Service(12, 'Окрашивание бровей', 3),
    Service(13, 'Ламинирование бровей', 3),
    Service(14, 'Ламинирование ресниц', 3),
    Service(15, 'Массаж лица', 4),
    Service(16, 'Массаж спины', 4),
    Service(17, 'Уход за кожей лица', 4),
    Service(18, 'Спа-уход для рук', 4),
]
