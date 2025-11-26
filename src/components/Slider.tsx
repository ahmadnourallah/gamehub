import { motion } from 'motion/react';
import { ReactNode } from 'react';

export default function Slider({
    isActive,
    children,
    position = 'left',
    className
}: {
    isActive: boolean;
    children: ReactNode;
    position?: 'left' | 'right';
    className?;
}) {
    return (
        <motion.div
            transition={{ bounce: 0 }}
            animate={{
                x: isActive ? 0 : position === 'left' ? -300 : 300,
                visibility: isActive ? 'visible' : 'hidden'
            }}
            className={`absolute top-0 h-full ${position === 'left' ? 'left-0' : 'right-0'} z-100 sm:!visible sm:static sm:h-auto sm:!transform-none sm:p-0 ${className}`}
        >
            {children}
        </motion.div>
    );
}
