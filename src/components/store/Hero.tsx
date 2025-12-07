'use client';
import { useCallback } from 'react';
import { mdiChevronLeft, mdiChevronRight, mdiGamepadVariant } from '@mdi/js';
import Link from 'next/link';
import AutoPlay from 'embla-carousel-autoplay';
import Icon from '@mdi/react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Button from '@/components/common/Button';

export default function Hero() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="embla relative">
            <div
                className="embla__viewport h-[calc(100vh-82.63px)] overflow-hidden"
                ref={emblaRef}
            >
                <div className="embla__container flex h-full">
                    <div className="embla__slide relative h-full min-w-0 flex-[0_0_100%]">
                        <div className="absolute top-0 left-0 z-100 flex h-full w-full flex-col items-center justify-center gap-5 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2))] text-center">
                            <div>
                                <h1 className="text-7xl font-bold">
                                    Game Store
                                </h1>
                                <p className="m-2 text-xl">
                                    All the games you&apos;re looking for in one
                                    place!
                                </p>
                            </div>

                            <Link href="/store">
                                <Button className="flex items-center gap-2">
                                    <Icon path={mdiGamepadVariant} size={1.2} />
                                    <span>Check them out</span>
                                </Button>
                            </Link>
                        </div>
                        <Image
                            alt=""
                            src="/hero1.jpg"
                            width={0}
                            height={0}
                            className="h-full w-full"
                            sizes="100vw"
                            objectFit="cover"
                            objectPosition="center"
                            fill
                        />
                    </div>
                    <div className="embla__slide relative h-full min-w-0 flex-[0_0_100%]">
                        <Image
                            src="/hero2.jpg"
                            alt=""
                            width={0}
                            height={0}
                            className="h-full w-full"
                            sizes="100vw"
                            objectFit="cover"
                            objectPosition="center"
                            fill
                        />
                    </div>
                    <div className="embla__slide relative h-full min-w-0 flex-[0_0_100%]">
                        <Image
                            src="/hero3.jpg"
                            alt=""
                            width={0}
                            height={0}
                            className="h-full w-full"
                            sizes="100vw"
                            objectFit="cover"
                            objectPosition="center"
                            fill
                        />
                    </div>
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
