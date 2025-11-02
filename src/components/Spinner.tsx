import { motion } from 'motion/react';

function Spinner({
    size,
    bg = '#dae1e7',
    spinnerColor = '#606f7b'
}: {
    size: string;
    bg?: string;
    spinnerColor?: string;
}) {
    return (
        <motion.div
            className="relative grid place-content-center rounded-full"
            animate={{ rotate: ['0deg', '360deg'] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{
                width: size,
                height: size,
                border: `calc(${size} / 10) solid ${bg}`
            }}
        >
            <div
                className="absolute rounded-full"
                style={{
                    top: `calc((${size} / 10) * -1)`,
                    left: `calc((${size} / 10) * -1)`,
                    border: `calc(${size} / 10) solid ${spinnerColor}`,
                    width: size,
                    height: size,
                    clipPath:
                        'inset(0 12.857% 77% 12.857% round 0 0 5.714% 5.714%)'
                }}
            ></div>
        </motion.div>
    );
}

export default Spinner;
