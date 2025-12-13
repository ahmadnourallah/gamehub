type ResponseDataType<DataKey extends string, DataType> = {
    [k in DataKey]: DataType;
};

interface FailResponseType {
    status: 'fail';
    code: number;
    data: { [k: string]: string }[];
}

export interface SuccessResponse<DataKey extends string, DataType> {
    status: 'success';
    data: ResponseDataType<DataKey, DataType> & { total?: number };
}

export type ResponseType<DataKey extends string, DataType> =
    | SuccessResponse<DataKey, DataType>
    | FailResponseType;

export type DeleteResponseType =
    | { status: 'success'; data: null }
    | FailResponseType;

export interface GenreType {
    id: number;
    name: string;
    createdAt: string;
}

export interface PlatformType {
    id: number;
    name: string;
    createdAt: string;
}

export interface PublisherType {
    id: number;
    name: string;
    createdAt: string;
}

export interface UserType {
    id: number;
    name: string;
    email: string;
    role: string;
    token: string;
}

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

export interface CartItemType {
    cartId: number;
    gameId: number;
    quantity: number;
    price: number;
}

export interface CartType {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    cartItems: CartItemType[];
}
