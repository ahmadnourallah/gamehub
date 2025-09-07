'use client';
import { useAnimate } from 'motion/react';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';

export default function SearchBar() {
    const [scope, animate] = useAnimate();

    const animateWidth = async (width: string) => {
        await animate(
            scope.current,
            { width },
            { duration: 0.4, type: 'spring' }
        );
    };

    return (
        <div ref={scope} className="relative not-sm:!w-full sm:w-1/4">
            <input
                placeholder="Search games..."
                onBlur={async () => await animateWidth('revert-layer')}
                onFocus={async () => await animateWidth('40%')}
                className="h-[50%] !w-full rounded-md bg-white py-2 pr-11 pl-3 text-black after:content-none focus:outline-0"
            />
            <button
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onBlur={async () => await animateWidth('revert-layer')}
                onFocus={async () => await animateWidth('40%')}
            >
                <Icon path={mdiMagnify} size={1} color="#000" />
            </button>
        </div>
    );
}
