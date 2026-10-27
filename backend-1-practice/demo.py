from salon import appointments, create_appointment


def main() -> None:
    appointments.clear()
    first_appointment = create_appointment('Иванова А.А.', 1, 1, '10:00')
    second_appointment = create_appointment('Петрова А.А.', 1, 1, '11:00')
    assert first_appointment is not None and second_appointment is not None
    print('Список записей:')
    for appointment in appointments:
        print(appointment.client_name, appointment.time)

    appointments.clear()
    no_correct_appointment = create_appointment('', 1, 1, '12:00')
    print('\nПустое имя:', no_correct_appointment)
    print('Количество записей:', len(appointments))

    appointments.clear()
    no_correct_time = create_appointment('Сидорова А.А.', 1, 1, '00:00')
    print('\nВремя 00:00:', no_correct_time)
    print('Количество записей:', len(appointments))

    for time in ('07:59', '08:00', '20:00', '20:01'):
        appointments.clear()
        result = create_appointment('Проверка границы', 1, 1, time)
        print(f'{time}: {"разрешено" if result is not None else "отклонено"}')


if __name__ == '__main__':
    main()
