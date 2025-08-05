import { useContext } from 'react';

import { historicalDatesContext } from '../../HistoricalDatesContext';

type TProps = {
    className?: string
};

function SectionName({ className }: Readonly<TProps>) {
    const { currentPeriodIndex, historicalDates } = useContext(historicalDatesContext)!;

    return (
        <div className={className}>
            {historicalDates[currentPeriodIndex].section || ''}
        </div>
    );
}

export default SectionName;
