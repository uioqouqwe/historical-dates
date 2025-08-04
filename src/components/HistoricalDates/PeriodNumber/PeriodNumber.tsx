import { useGSAP } from '@gsap/react';
import { usePrevious } from '../../../hooks/usePrevious';
import { useRef } from 'react';
import gsap from 'gsap';

type TProps = {
    number: number
    className?: string
};

function PeriodNumber({ number, className }: Readonly<TProps>) {
    const previousNumber = usePrevious(number);
    const periodNumberRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        gsap.fromTo(periodNumberRef.current, { textContent: previousNumber }, { textContent: number, duration: 1, snap: { textContent: 1 } });
    }, [number]);

    return (
        <span className={className} ref={periodNumberRef}>{number}</span>
    );
}

export default PeriodNumber;
