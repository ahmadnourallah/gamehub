'use client';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import {
    EmblaCarouselType,
    EmblaOptionsType,
    EmblaPluginType
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Icon from '@mdi/react';

export default function Carousel({
    options,
    plugins,
    className,
    enableDots = false,
    children
}: {
    options?: EmblaOptionsType;
    plugins?: EmblaPluginType[];
    className?: string;
    enableDots?: boolean;
    children: ReactNode;
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const updateSeletedIndex = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (emblaApi) emblaApi.on('select', updateSeletedIndex);

        return () => {
            if (emblaApi) emblaApi.off('select', updateSeletedIndex);
        };
    }, [emblaApi, updateSeletedIndex]);

    return (
        <div className="embla relative">
            <div className={`embla__viewport ${className}`} ref={emblaRef}>
                {children}
            </div>
            <button
                className="embla__prev absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.2)] backdrop-blur-sm"
                onClick={scrollPrev}
            >
                <Icon
                    path={mdiChevronLeft}
                    className="h-12 w-12 sm:h-16 sm:w-16"
                    color="#FFF"
                />
            </button>

            <button
                className="embla__next absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.2)] backdrop-blur-sm"
                onClick={scrollNext}
            >
                <Icon
                    path={mdiChevronRight}
                    className="h-12 w-12 sm:h-16 sm:w-16"
                    color="#FFF"
                />
            </button>
            {emblaApi && enableDots && (
                <div className="embla__dots -transate-x-1/2 absolute right-1/2 bottom-5 flex gap-3 rounded-lg bg-black px-4 py-3">
                    {Array.from(emblaApi.slideNodes()).map((image, index) => (
                        <button
                            onClick={() => scrollTo(index)}
                            key={index}
                            className={`h-[9px] w-[9px] rounded-full transition-transform duration-100 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#999999] ${selectedIndex === index ? 'scale-130 bg-[#18b0ab]' : 'bg-[#999999]'}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
}
