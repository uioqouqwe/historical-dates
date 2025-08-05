import { useState } from 'react';

import { THistoricalDatesInPeriod } from '@/types/historicalDates';

import PeriodCarousel from './PeriodCarousel/PeriodCarousel';

import classes from './HistoricalDates.module.scss';
import { HistoricalDatesContextProvider } from './HistoricalDatesContext';

type TProps = {
    historicalDates: THistoricalDatesInPeriod[]
};

function HistoricalDates({ historicalDates }: Readonly<TProps>) {
    const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);

    return (
        <HistoricalDatesContextProvider
            historicalDates={historicalDates}
            currentPeriodIndex={currentPeriodIndex}
            setCurrentPeriodIndex={setCurrentPeriodIndex}
        >
            <div className={classes.Container}>
                <h3 className={classes.Title}>Исторические даты</h3>
                <PeriodCarousel/>
            </div>
        </HistoricalDatesContextProvider>
    );
}

export default HistoricalDates;
