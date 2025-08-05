import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSwiper } from 'swiper/react';

import Arrow from '@/assets/arrow.svg';

import classes from './ControlButton.module.scss';

const cx = classNames.bind(classes);

type TProps = {
    className?: string
    mode: 'prev' | 'next'
};

function ControlButton({ className, mode }: Readonly<TProps>) {
    const swiper = useSwiper();
    const [isDisabled, setIsDisabled] = useState(mode === 'prev' ? true :false);

    useEffect(() => {
        swiper.on('slideChange', s => {
            setIsDisabled(mode === 'prev' ? s.isBeginning : s.isEnd);
        });

        return () => swiper.off('slideChange');
    }, [mode]);

    useEffect(() => {
        const eventName = mode === 'prev' ? 'reachBeginning' : 'reachEnd';

        swiper.on(eventName, () => {
            setIsDisabled(true);
        });

        return () => swiper.off(eventName);
    }, [mode]);

    return (
        <button
            className={cx({
                ...(className && { [className]: true }),
                ControlButton: true,
                Disabled: isDisabled,
            })}
            onClick={() => mode === 'prev' ? swiper.slidePrev() : swiper.slideNext()}
        >
            <Arrow className={cx({ Arrow: true, Rotated: mode === 'next' })}/>
        </button>
    )
}

export default ControlButton;
