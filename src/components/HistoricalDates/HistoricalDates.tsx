import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';

import { THistoricalDatesInPeriod } from '../../types/historicalDates';
import classes from './HistoricalDates.module.scss';
import PeriodSlide from './PeriodSlide/PeriodSlide';

const cx = classNames.bind(classes);

type TProps = {
    historicalDates: THistoricalDatesInPeriod[]
}

function HistoricalDates({ historicalDates }: Readonly<TProps>) {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <div className={classes.Container}>
            <h3 className={classes.Title}>Исторические даты</h3>
            <div className={classes.Swiper}>
                {historicalDates.map((_item, index) => (
                    <PeriodSlide
                        transform={`rotate(calc(360deg / ${historicalDates.length} * ${index + 2 - activeSlide}))`}
                        index={index}
                        activeSlide={activeSlide}
                        setActiveSlide={useCallback(() => setActiveSlide(index), [setActiveSlide])}
                        key={index}
                    />
                ))}
                <div className={classes.Period}>{
                    `${historicalDates[activeSlide].period[0]} ${historicalDates[activeSlide].period[1]}`
                }</div>
            </div>
            <div className={classes.SwiperControls}>
                <div>{`${activeSlide + 1} / ${historicalDates.length}`}</div>
                <div>
                    <button
                        className={cx({
                            ControlButton: true,
                            PrevButton: true,
                            Disabled: activeSlide === 0
                        })}
                        onClick={() => setActiveSlide(prevActiveSlide => prevActiveSlide - 1)}
                    >
                        Prev
                    </button>
                    <button
                        className={cx({
                            ControlButton: true,
                            NextButton: true,
                            Disabled: activeSlide === historicalDates.length - 1
                        })}
                        onClick={() => setActiveSlide(prevActiveSlide => prevActiveSlide + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HistoricalDates;
