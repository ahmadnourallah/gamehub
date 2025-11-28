import { motion } from 'motion/react';
import { ReactNode, RefObject } from 'react';

export default function Slider({
    isActive,
    children,
    position = 'left',
    className,
    ref
}: {
    isActive: boolean;
    children: ReactNode;
    position?: 'left' | 'right';
    className?: string;
    ref?: RefObject<HTMLDivElement | null>;
}) {
    return (
        <motion.div
            ref={ref}
            transition={{ bounce: 0 }}
            animate={{
                x: isActive
                    ? 0
                    : position === 'left'
                      ? -(ref?.current?.offsetWidth || 300)
                      : ref?.current?.offsetWidth || 300,
                visibility: isActive ? 'visible' : 'hidden'
            }}
            className={`absolute top-0 h-full ${position === 'left' ? 'left-0' : 'right-0'} z-80 ${className}`}
        >
            {children}
        </motion.div>
    );
}
