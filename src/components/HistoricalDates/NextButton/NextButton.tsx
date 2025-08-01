import { useSwiper } from 'swiper/react';

import classes from './NextButton.module.scss';

function NextButton() {
    const swiper = useSwiper();

    return (
        <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
    );
}

export default NextButton;
