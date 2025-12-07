'use client';
import { useCallback } from 'react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import type { GameType } from '@/queries/game';
import AutoPlay from 'embla-carousel-autoplay';
import Icon from '@mdi/react';
import useEmblaCarousel from 'embla-carousel-react';
import GameCard from './GameCard';

export default function GameSlider({ games }: { games: GameType[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true }, [
        AutoPlay()
    ]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="embla relative">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex h-full *:mx-2 *:flex-[0_0_50%] sm:*:flex-[0_0_25%]">
                    {games.map((game, i) => (
                        <div key={i} className="embla__slide min-w-0">
                            <GameCard
                                id={game.id}
                                thumbnail={game.images[0]}
                                title={game.title}
                                price={game.price}
                                platforms={game.platforms}
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
