import classNames from 'classnames/bind';
import { useSwiper } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { useContext, useEffect } from 'react';

import Arrow from '@/assets/arrow.svg';
import ArrowMobile from '@/assets/arrow-mobile.svg';


import { historicalDatesContext } from '../../HistoricalDatesContext';
import classes from './CarouselControls.module.scss';

const cx = classNames.bind(classes);

type TProps = {
    className?: string
};

function CarouselControls({ className }: Readonly<TProps>) {
    const isMobile = useMediaQuery({ maxWidth: 600 });
    const swiper = useSwiper();
    const { currentPeriodIndex, historicalDates } = useContext(historicalDatesContext)!;

    return (
        <div className={className}>
            <span className={classes.CarouselControlsNumber}>{`${currentPeriodIndex + 1} / ${historicalDates.length}`}</span>
            <div className={classes.CarouselControlsButtons}>
                <button
                    className={cx({
                        ControlButton: true,
                        Disabled: currentPeriodIndex === 0,
                    })}
                    onClick={() => swiper.slidePrev()}
                    disabled={currentPeriodIndex === 0}
                >
                    {isMobile ? <ArrowMobile className={classes.Arrow}/> : <Arrow className={classes.Arrow}/>}
                </button>
                <button
                    className={cx({
                        ControlButton: true,
                        Disabled: currentPeriodIndex === historicalDates.length - 1,
                    })}
                    onClick={() => swiper.slideNext()}
                    disabled={currentPeriodIndex === historicalDates.length - 1}
                >
                    {isMobile ? <ArrowMobile className={cx({ Arrow: true, Right: true })}/> : <Arrow className={cx({ Arrow: true, Right: true })}/>}
                </button>
            </div>
            {isMobile && (
                <div className={classes.Pagination}>
                    {Array.from({ length: historicalDates.length }).map((_, index) => (
                        <button
                            key={index}
                            className={classes.Button}
                            onClick={() => swiper.slideTo(index)}
                        >
                            <span className={cx({ Dot: true, Active: currentPeriodIndex === index })}/>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CarouselControls;
