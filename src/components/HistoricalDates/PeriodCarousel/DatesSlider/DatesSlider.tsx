import { useGSAP } from '@gsap/react';
import classNames from 'classnames/bind';
import gsap from 'gsap';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { historicalDatesContext } from '../../HistoricalDatesContext';
import ControlButton from './ControlButton/ControlButton';

import classes from './DatesSlider.module.scss';

const cx = classNames.bind(classes);

type TProps = {
    className?: string
};

function DatesSlider({ className }: Readonly<TProps>) {
    const isMobile = useMediaQuery({ maxWidth: 600 });
    const [swiperKey, setSwiperKey] = useState(0);
    const swiperRef = useRef(null);
    const swiperInstanceRef = useRef<SwiperType>(null);
    const { currentPeriodIndex, historicalDates } = useContext(historicalDatesContext)!;
    const [fullyVisibleSlides, setFullyVisibleSlides] = useState<boolean[]>(historicalDates.map(() => true));

    useGSAP(() => {
        if (currentPeriodIndex === swiperKey) {
            return;
        }

        gsap
            .to(swiperRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power1.out',
            })
            .then(() => {
                swiperInstanceRef.current?.slideTo(0);
                setSwiperKey(currentPeriodIndex);
            });
    }, [currentPeriodIndex]);

    return (
            <Swiper
                key={swiperKey}
                ref={swiperRef}
                className={cx({
                    ...(className && {
                        [className]: true,
                    }),
                    Hidden: swiperKey !== swiperKey
                })}
                wrapperClass={classes.Wrapper}
                slidesPerView='auto'
                onBeforeInit={(swiper) => swiperInstanceRef.current = swiper}
                slideVisibleClass={classes.Visible}
                watchSlidesProgress
                onInit={swiper => {
                    setFullyVisibleSlides(getFullyVisibleSlides(swiper));
                }}
                onSlideChange={swiper => {
                    setFullyVisibleSlides(getFullyVisibleSlides(swiper));
                }}
            >
                {isMobile && (
                    <div className={classes.SectionName}>
                        {historicalDates[swiperKey].section}
                    </div>
                )}
                {historicalDates[swiperKey].dates.map(({ year, description }, index) => (
                    <SwiperSlide
                        className={cx({ [classes.Slide]: true,
                        [classes.NotFullyVisible]: !fullyVisibleSlides[index] })}
                        key={index}
                    >
                        <h5 className={classes.Year}>{year}</h5>
                        <p className={classes.Description}>{description}</p>
                    </SwiperSlide>
                ))}
                <ControlButton className={cx({ ControlButton: true, Previous: true })} mode='prev' />
                <ControlButton className={cx({ ControlButton: true, Next: true })} mode='next' />
            </Swiper>
    );
}

function getFullyVisibleSlides(swiper: SwiperType) {
    return swiper.slides.map((slide, i) => {
        let offsetCenter = -swiper.translate;
        let slideOffset = (slide as any).swiperSlideOffset;
        const slideBefore = -(offsetCenter - slideOffset);
        return slideBefore >= 0 && slideBefore <= swiper.width - swiper.slidesSizesGrid[i];
    });
}

export default DatesSlider;
