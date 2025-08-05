import { createContext, useMemo } from 'react';

import { THistoricalDatesInPeriod } from '@/types/historicalDates';

type THistoricalDatesContext = {
    historicalDates: THistoricalDatesInPeriod[]
    currentPeriodIndex: number
    setCurrentPeriodIndex: (index: number) => void
};

export const historicalDatesContext = createContext<THistoricalDatesContext | null>(null);

type TProps = THistoricalDatesContext & {
    children: React.ReactNode
};

export function HistoricalDatesContextProvider({ historicalDates, currentPeriodIndex, setCurrentPeriodIndex, children }: TProps) {
    const contextValue = useMemo(() => ({
        historicalDates,
        currentPeriodIndex,
        setCurrentPeriodIndex,
    } as THistoricalDatesContext), [historicalDates, currentPeriodIndex, setCurrentPeriodIndex]);

    return (
        <historicalDatesContext.Provider value={contextValue}>
            {children}
        </historicalDatesContext.Provider>
    );
}
