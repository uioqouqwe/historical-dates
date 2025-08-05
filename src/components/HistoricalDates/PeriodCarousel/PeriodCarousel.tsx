import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from 'react';

import { historicalDatesContext } from '../HistoricalDatesContext';
import PeriodSlide from './PeriodSlide/PeriodSlide';
import CarouselControls from './CarouselControls/CarouselControls';
import PeriodYears from './PeriodYears/PeriodYears';
import DatesSlider from './DatesSlider/DatesSlider';

import classes from './PeriodCarousel.module.scss';

function PeriodCarousel() {
    const { setCurrentPeriodIndex, historicalDates } = useContext(historicalDatesContext)!;

    return (
        <Swiper
            className={classes.Carousel}
            wrapperClass={classes.CarouselWrapper}
            onSlideChange={swiper => setCurrentPeriodIndex(swiper.activeIndex)}
            virtualTranslate
        >
            {historicalDates.map((item, index) => (
                <SwiperSlide key={index}>
                    <PeriodSlide
                        index={index}
                        slidesLength={historicalDates.length}
                        section={item.section}
                    />
                </SwiperSlide>
            ))}
            <PeriodYears className={classes.PeriodYears}/>
            <CarouselControls className={classes.CarouselControls}/>
            <DatesSlider
                className={classes.DatesSlider}
            />
        </Swiper>
    );
}

export default PeriodCarousel;
