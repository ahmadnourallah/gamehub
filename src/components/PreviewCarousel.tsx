'use client';
import { useCallback } from 'react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import useEmblaCarousel from 'embla-carousel-react';
import shimmer from '@/utils/shimmer';
import Image from 'next/image';
import Icon from '@mdi/react';

export default function PreviewCarousel({ images }: { images: string[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel();

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="embla relative">
            <div
                className="embla__viewport h-120 overflow-hidden rounded-2xl"
                ref={emblaRef}
            >
                <div className="embla__container flex h-full">
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className="embla__slide relative h-full min-w-0 flex-[0_0_100%]"
                        >
                            <Image
                                alt=""
                                placeholder={`data:image/svg+xml;base64,${shimmer()}`}
                                src={`${process.env.NEXT_PUBLIC_API}/${image}`}
                                width={0}
                                height={0}
                                className="h-full w-full"
                                sizes="100vw"
                                objectFit="cover"
                                objectPosition="center"
                                fill
                            />
                        </div>
                    ))}
                </div>
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
        </div>
    );
}
