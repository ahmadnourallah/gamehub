import { GenreType } from './genre';
import { PlatformType } from './platform';
import { PublisherType } from './publisher';

type ResponseDataType<DataKey extends string, DataType> = {
    [k in DataKey]: DataType;
};

interface FailResponseType {
    status: 'fail';
    code: number;
    data: { [k: string]: string }[];
}

interface SuccessResponse<DataKey extends string, DataType> {
    status: 'success';
    data: ResponseDataType<DataKey, DataType>;
}

export type ResponseType<DataKey extends string, DataType> =
    | SuccessResponse<DataKey, DataType>
    | FailResponseType;

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

export async function getGames(
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'asc'
): Promise<GameType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/games?start=${start}&end=${end}&search=${search}&orderby=${orderBy}&order=${order}`
    );

    if (!response.ok) throw new Error("Server isn't responding!");

    const data = await response.json();

    return data.data.games;
}

export async function getGame(
    id: number
): Promise<ResponseType<'game', GameType>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/games/${id}`);

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}
