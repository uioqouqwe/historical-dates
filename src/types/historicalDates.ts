export type TPeriod = readonly [starts: number, ends: number];

type THistoricalDate = {
    year: number
    description: string
}

export type THistoricalDatesInPeriod = {
    period: TPeriod
    dates: THistoricalDate[]
}
