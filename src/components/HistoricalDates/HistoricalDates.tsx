import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { THistoricalDatesInPeriod } from '../../types/historicalDates';
import classes from './HistoricalDates.module.scss';
import PeriodSlide from './PeriodSlide/PeriodSlide';
import { usePrevious } from '../../hooks/usePrevious';
import PeriodNumber from './PeriodNumber/PeriodNumber';
import LeftArrow from '../../assets/left-arrow.svg';
import RightArrow from '../../assets/right-arrow.svg';
import { Swiper, SwiperSlide } from 'swiper/react';

const cx = classNames.bind(classes);

type TProps = {
    historicalDates: THistoricalDatesInPeriod[]
}

function HistoricalDates({ historicalDates }: Readonly<TProps>) {
    const [activeSlide, setActiveSlide] = useState(0);
    const previousActiveSlide = usePrevious(activeSlide);

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
                <div className={classes.Period}>
                    <PeriodNumber className={classes.PeriodStart} number={historicalDates[activeSlide].period[0]} />
                    &nbsp;
                    <PeriodNumber className={classes.PeriodEnd} number={historicalDates[activeSlide].period[1]} />
                </div>
            </div>
            <div className={classes.SwiperControls}>
                <span className={classes.SwiperControlsNumber}>{`${activeSlide + 1} / ${historicalDates.length}`}</span>
                <div className={classes.SwiperControlsButtons}>
                    <button
                        className={cx({
                            ControlButton: true,
                            PrevButton: true,
                            Disabled: activeSlide === 0
                        })}
                        onClick={() => {
                            setActiveSlide(prevActiveSlide => prevActiveSlide - 1);
                        }}
                        disabled={activeSlide === 0}
                    >
                        <LeftArrow className={classes.Arrow} />
                    </button>
                    <button
                        className={cx({
                            ControlButton: true,
                            NextButton: true,
                            Disabled: activeSlide === historicalDates.length - 1
                        })}
                        onClick={() => setActiveSlide(prevActiveSlide => prevActiveSlide + 1)}
                        disabled={activeSlide === historicalDates.length - 1}
                    >
                        <RightArrow className={classes.Arrow} />
                    </button>
                </div>
            </div>
            <Swiper>
                {historicalDates[activeSlide].dates.map(({ year, description }, index) => (
                    <SwiperSlide key={index}>
                        <h5>{year}</h5>
                        <p>{description}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HistoricalDates;
