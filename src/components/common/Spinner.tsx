'use client';

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
        <div
            className="relative grid animate-spin place-content-center rounded-full"
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
        </div>
    );
}

export default Spinner;
