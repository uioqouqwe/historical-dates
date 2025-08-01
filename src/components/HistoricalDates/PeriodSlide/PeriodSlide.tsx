import classNames from 'classnames/bind';

import classes from './PeriodSlide.module.scss';

const cx = classNames.bind(classes);

type TProps = {
    index: number
    activeSlide: number
    setActiveSlide: () => void
    transform: string
};

function PeriodSlide({ index, activeSlide, setActiveSlide, transform }: Readonly<TProps>) {
    return (
        <div
            className={classes.Slide}
            style={{ transform }}
            onClick={() => setActiveSlide()}
        >
            <button className={cx({ SlideButton: true, Active: index === activeSlide })}>
                <span
                    style={{
                        transform: transform.replace('calc(', 'calc(-'),
                    }}
                    className={classes.SlideNumber}
                >
                    {index + 1}
                </span>
            </button>
        </div>
    );
}

export default PeriodSlide;
