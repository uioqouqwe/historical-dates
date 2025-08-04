import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { THistoricalDatesInPeriod } from '../../types/historicalDates';
import classes from './HistoricalDates.module.scss';
import PeriodSlide from './PeriodSlide/PeriodSlide';
import { usePrevious } from '../../hooks/usePrevious';
import PeriodNumber from './PeriodNumber/PeriodNumber';
import Arrow from '../../assets/arrow.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const cx = classNames.bind(classes);

type TProps = {
    historicalDates: THistoricalDatesInPeriod[]
}

function HistoricalDates({ historicalDates }: Readonly<TProps>) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [swiperKey, setSwiperKey] = useState(0);
    const previousActiveSlide = usePrevious(activeSlide);
    const swiperRef = useRef(null);
    const swiperInstanceRef = useRef<SwiperType>(null);
    const [swiperPrevDisabled, setSwiperPrevDisabled] = useState(true);
    const [swiperNextDisabled, setSwiperNextDisabled] = useState(false);

    useGSAP(() => {
        if (activeSlide === swiperKey) {
            return;
        }

        gsap
            .to(swiperRef.current, {
                key: activeSlide,
                opacity: 0,
                duration: 0.5,
                ease: 'power1.out',
            })
            .then(() => {
                swiperInstanceRef.current?.slideTo(0);
                setSwiperKey(activeSlide);
            });
    }, [activeSlide]);

    return (
        <div className={classes.Container}>
            <h3 className={classes.Title}>Исторические даты</h3>
            <div className={classes.Carousel}>
                {historicalDates.map((_item, index) => (
                    <PeriodSlide
                        transform={`rotate(calc(360deg / ${historicalDates.length} * ${index + 2 - activeSlide}))`}
                        index={index}
                        activeSlide={activeSlide}
                        setActiveSlide={useCallback(() => setActiveSlide(index), [setActiveSlide])}
                        key={index}
                    />
                ))}
            </div>
            <div className={classes.Period}>
                <PeriodNumber className={classes.PeriodStart} number={historicalDates[activeSlide].period[0]} />
                &nbsp;
                <PeriodNumber className={classes.PeriodEnd} number={historicalDates[activeSlide].period[1]} />
            </div>
            <div className={classes.CarouselControls}>
                <span className={classes.CarouselControlsNumber}>{`${activeSlide + 1} / ${historicalDates.length}`}</span>
                <div className={classes.CarouselControlsButtons}>
                    <button
                        className={cx({
                            ControlButton: true,
                            Disabled: activeSlide === 0
                        })}
                        onClick={() => {
                            setActiveSlide(prevActiveSlide => prevActiveSlide - 1);
                            swiperInstanceRef.current?.init();
                        }}
                        disabled={activeSlide === 0}
                    >
                        <Arrow className={classes.Arrow}/>
                    </button>
                    <button
                        className={cx({
                            ControlButton: true,
                            Disabled: activeSlide === historicalDates.length - 1
                        })}
                        onClick={() => {
                            setActiveSlide(prevActiveSlide => prevActiveSlide + 1);
                            swiperInstanceRef.current?.init();
                        }}
                        disabled={activeSlide === historicalDates.length - 1}
                    >
                        <Arrow className={cx({ Arrow: true, Right: true })}/>
                    </button>
                </div>
            </div>
            <div className={classes.SwiperContainer}>
                <Swiper
                    key={swiperKey}
                    ref={swiperRef}
                    className={cx({
                        Swiper: true,
                        Hidden: swiperKey !== swiperKey
                    })}
                    wrapperClass={classes.SwiperWrapper}
                    slidesPerView='auto'
                    onBeforeInit={(swiper) => {
                        swiperInstanceRef.current = swiper;
                    }}
                    onSlideChange={swiper => {
                        setSwiperPrevDisabled(swiper.isBeginning);
                        setSwiperNextDisabled(swiper.isEnd);
                    }}
                >
                    {historicalDates[swiperKey].dates.map(({ year, description }, index) => (
                        <SwiperSlide className={classes.SwiperSlide} key={index}>
                            <h5 className={classes.Year}>{year}</h5>
                            <p className={classes.Description}>{description}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    className={cx({ SwiperButton: true, Previous: true, Disabled: swiperPrevDisabled })}
                    onClick={() => swiperInstanceRef.current?.slidePrev()}
                >
                    <Arrow className={classes.Arrow}/>
                    </button>
                <button
                    className={cx({ SwiperButton: true, Next: true, Disabled: swiperNextDisabled })}
                    onClick={() => swiperInstanceRef.current?.slideNext()}
                >
                    <Arrow className={classes.Arrow}/>
                </button>
            </div>
            
        </div>
    );

    function getSwiper() {
        return 
    }
}

export default HistoricalDates;
