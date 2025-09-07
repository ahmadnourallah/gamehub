import { GenreType } from './genre';
import { PlatformType } from './platform';
import { PublisherType } from './publisher';

export interface GameType {
    id: number;
    title: string;
    images: string[];
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    genres: GenreType[];
    platforms: PlatformType[];
    publishers: PublisherType[];
}

export async function getGames(): Promise<GameType[]> {
    const response = await fetch(
        `${process.env.API}/games?orderby=date&order=desc`
    );

    if (!response.ok) throw new Error("Server isn't responding!");

    const data = await response.json();

    return data.data.games;
}

export async function getGame(id: number): Promise<GameType> {
    const response = await fetch(`${process.env.API}/games/${id}`);

    if (!response.ok) throw new Error("Server isn't responding!");

    const data = await response.json();

    return data.data.game;
}
