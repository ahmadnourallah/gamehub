'use client';
import type { GameType, GenreType, PlatformType } from '@/lib/types';
import { updateGame } from '@/actions/game';
import { updateGenre } from '@/actions/genre';
import { updatePlatform } from '@/actions/platform';
import DashEditor from '@/components/dashboard/DashEditor';

export function GameEditor({ game }: { game: GameType }) {
    return (
        <DashEditor<'game', GameType>
            mode="EDIT"
            onSubmit={updateGame}
            redirectTo="/dashboard/games"
            item={game}
        />
    );
}

export function GenreEditor({ genre }: { genre: GenreType }) {
    return (
        <DashEditor<'genre', GenreType>
            mode="EDIT"
            onSubmit={updateGenre}
            redirectTo="/dashboard/genres"
            item={genre}
        />
    );
}

export function PlatformEditor({ platform }: { platform: PlatformType }) {
    return (
        <DashEditor<'platform', PlatformType>
            mode="EDIT"
            onSubmit={updatePlatform}
            redirectTo="/dashboard/platforms"
            item={platform}
        />
    );
}
