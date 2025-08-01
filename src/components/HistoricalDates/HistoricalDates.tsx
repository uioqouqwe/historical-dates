import { THistoricalDatesInPeriod } from '../../types/historicalDates';
import classes from './HistoricalDates.module.scss';

type TProps = {
    historicalDates: THistoricalDatesInPeriod[]
}

function HistoricalDates({ historicalDates }: Readonly<TProps>) {
    return (
        <div className={classes.Container}>
            <h3 className={classes.Title}>Исторические даты</h3>
        </div>
    );
}

export default HistoricalDates;
