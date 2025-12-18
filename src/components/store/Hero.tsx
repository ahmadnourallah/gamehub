'use client';
import { mdiGamepadVariant } from '@mdi/js';
import Link from 'next/link';
import AutoPlay from 'embla-carousel-autoplay';
import Icon from '@mdi/react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Carousel from '../common/Carousel';

export default function Hero() {
    return (
        <Carousel
            className="h-[calc(100vh-82.63px)] overflow-hidden"
            options={{ loop: true }}
            plugins={[AutoPlay()]}
        >
            <div className="embla__container flex h-full">
                <div className="embla__slide relative h-full min-w-0 flex-[0_0_100%]">
                    <div className="absolute top-0 left-0 z-100 flex h-full w-full flex-col items-center justify-center gap-5 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2))] text-center">
                        <div>
                            <h1>Game Store</h1>
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
        </Carousel>
    );
}
