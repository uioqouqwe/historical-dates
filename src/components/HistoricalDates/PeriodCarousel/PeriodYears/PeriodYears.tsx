import { useSwiper } from 'swiper/react';
import { useContext } from 'react';

import { THistoricalDatesInPeriod } from '@/types/historicalDates';

import { historicalDatesContext } from '../../HistoricalDatesContext';
import PeriodNumber from './PeriodNumber/PeriodNumber';

import classes from './PeriodYears.module.scss';

type TProps = {
    className?: string
};

function PeriodYears({ className }: Readonly<TProps>) {
    const { currentPeriodIndex, historicalDates } = useContext(historicalDatesContext)!;

    return (
        <div className={className}>
            <PeriodNumber className={classes.PeriodStart} number={historicalDates[currentPeriodIndex].period[0]} />
            &nbsp;
            <PeriodNumber className={classes.PeriodEnd} number={historicalDates[currentPeriodIndex].period[1]} />
        </div>
    );
}

export default PeriodYears;
