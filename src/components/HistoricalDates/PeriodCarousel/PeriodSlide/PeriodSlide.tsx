import classNames from 'classnames/bind';
import gsap from 'gsap';
import { useContext, useEffect, useRef } from 'react';
import { useSwiper } from 'swiper/react';

import { historicalDatesContext } from '../../HistoricalDatesContext';

import classes from './PeriodSlide.module.scss';

const cx = classNames.bind(classes);

type TProps = {
    index: number
    slidesLength: number
    section?: string
};

function PeriodSlide({ index, slidesLength, section }: Readonly<TProps>) {
    const swiper = useSwiper();
    const sectionRef = useRef<HTMLDivElement>(null);
    const { currentPeriodIndex } = useContext(historicalDatesContext)!;

    useEffect(() => {
        swiper.on('slideChange', s => {
            if (!sectionRef.current) {
                return;
            }

            if (index === s.activeIndex) {
                gsap
                    .to(sectionRef.current, {
                        opacity: 1,
                        delay: 1,
                        duration: 0.3,
                        ease: 'power1.out',
                    });
            } else {
                gsap
                    .to(sectionRef.current, {
                        opacity: 0,
                        duration: 1,
                        ease: 'power1.out',
                    });
            }
        });

        return () => swiper.off('slideChange');
    }, []);

    return (
        <div
            className={cx({ Slide: true, Active: index === currentPeriodIndex })}
            style={{
                transform: `rotate(calc(360deg / ${slidesLength} * ${index + 2 - currentPeriodIndex}))`,
            }}
            onClick={() => swiper.slideTo(index)}
        >
            <div
                className={classes.Content}
                style={{
                    transform: `rotate(calc(-360deg / ${slidesLength} * ${index + 2 - currentPeriodIndex}))`,
                }}
            >
                <button className={classes.Button}>
                    {index + 1}
                </button>
                {section && (
                    <div
                        ref={sectionRef}
                        className={cx({ Section: true, Hidden: index !== currentPeriodIndex })}
                    >
                        {section}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PeriodSlide;
