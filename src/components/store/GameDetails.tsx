'use client';
import type { GameType } from '@/utils/types';
import { motion } from 'motion/react';
import { useState } from 'react';
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';

export default function GameDetails({ game }: { game: GameType }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <motion.div
            layout
            transition={{ bounce: 0, ease: 'linear' }}
            className="mt-4 flex flex-col rounded-lg bg-[#202020] p-4 will-change-contents"
        >
            <h2 className="text-2xl font-bold">Description</h2>
            <p className="mt-2 text-lg">{game.description}</p>

            <motion.div
                animate={{ maxHeight: isActive ? '100px' : 0 }}
                className="my-2 overflow-hidden text-lg"
            >
                <div>
                    <span className="font-bold">Genres: </span>
                    {game.genres.map((genre, i) => (
                        <span key={i}>
                            {genre.name}
                            {i !== game.genres.length - 1 && ', '}
                        </span>
                    ))}
                </div>

                <div>
                    <span className="font-bold">Platforms: </span>
                    {game.platforms.map((platform, i) => (
                        <span key={i}>
                            {platform.name}
                            {i !== game.platforms.length - 1 && ', '}
                        </span>
                    ))}
                </div>

                <div>
                    <span className="font-bold">Publishers: </span>
                    {game.publishers.map((publisher, i) => (
                        <span key={i}>
                            {publisher.name}
                            {i !== game.publishers.length - 1 && ', '}
                        </span>
                    ))}
                </div>
            </motion.div>

            <button
                onClick={() => setIsActive(!isActive)}
                className="flex items-center self-end text-lg transition-colors duration-200 hover:text-[rgb(204,204,204)]"
            >
                <span>{isActive ? 'Less' : 'More'}</span>
                <Icon
                    path={isActive ? mdiChevronUp : mdiChevronDown}
                    size={1}
                />
            </button>
        </motion.div>
    );
}
