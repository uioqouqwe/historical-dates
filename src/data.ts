import { THistoricalDatesInPeriod } from './types/historicalDates'

export const historicalDates: THistoricalDatesInPeriod[] = [
    {
        period: [1000, 1200],
        dates: [
            { year: 1066, description: 'Нормандское завоевание Англии' },
            { year: 1095, description: 'Начало Первого крестового похода' },
            { year: 1147, description: 'Второй крестовый поход' },
            { year: 1189, description: 'Начало Третьего крестового похода' }
        ]
    },
    {
        period: [1200, 1400],
        dates: [
            { year: 1204, description: 'Завоевание Константинополя крестоносцами' },
            { year: 1215, description: 'Подписание Великой хартии вольностей' },
            { year: 1271, description: 'Начало путешествия Марко Поло' },
            { year: 1347, description: 'Начало эпидемии чумы в Европе' },
            { year: 1380, description: 'Куликовская битва' }
        ]
    },
    {
        period: [1400, 1600],
        dates: [
            { year: 1453, description: 'Падение Константинополя' },
            { year: 1492, description: 'Открытие Америки Христофором Колумбом' },
            { year: 1517, description: 'Начало Реформации' },
            { year: 1588, description: 'Разгром испанской армады' }
        ]
    },
    {
        period: [1600, 1800],
        dates: [
            { year: 1618, description: 'Начало Тридцатилетней войны' },
            { year: 1683, description: 'Венская битва' },
            { year: 1703, description: 'Основание Санкт-Петербурга' },
            { year: 1776, description: 'Декларация независимости США' },
            { year: 1789, description: 'Великая французская революция' }
        ]
    },
    {
        period: [1800, 1900],
        dates: [
            { year: 1812, description: 'Отечественная война 1812 года' },
            { year: 1815, description: 'Битва при Ватерлоо' },
            { year: 1861, description: 'Начало Гражданской войны в США' },
            { year: 1871, description: 'Объединение Германии' },
            { year: 1898, description: 'Испано-американская война' }
        ]
    },
    {
        period: [1900, 2000],
        dates: [
            { year: 1914, description: 'Начало Первой мировой войны' },
            { year: 1917, description: 'Октябрьская революция в России' },
            { year: 1939, description: 'Начало Второй мировой войны' },
            { year: 1945, description: 'Окончание Второй мировой войны' },
            { year: 1961, description: 'Первый полет человека в космос' },
            { year: 1969, description: 'Высадка на Луну' },
            { year: 1989, description: 'Падение Берлинской стены' }
        ]
    }
]
