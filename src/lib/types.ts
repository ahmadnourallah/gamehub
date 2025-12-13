type ResponseDataType<DataKey extends string, DataType> = {
    [k in DataKey]: DataType;
};

interface FailureResponseType {
    status: 'fail';
    code: number;
    data: { [k: string]: string }[];
}

export interface SuccessResponseType<Data extends object | null> {
    status: 'success';
    data: Data;
}

export type QueryAllResponseType<DataKey extends string, DataType> =
    | SuccessResponseType<
          ResponseDataType<DataKey, DataType> & { total: number }
      >
    | FailureResponseType;

export type QueryResponseType<DataKey extends string, DataType> =
    | SuccessResponseType<ResponseDataType<DataKey, DataType>>
    | FailureResponseType;

export type UpdateResponseType<DataKey extends string, DataType> =
    | SuccessResponseType<ResponseDataType<DataKey, DataType>>
    | FailureResponseType;

export type DeleteResponseType =
    | SuccessResponseType<null>
    | FailureResponseType;

export interface CategoryType {
    id: number;
    name: string;
    createdAt: string;
}

export type GenreType = CategoryType;
export type PlatformType = CategoryType;
export type PublisherType = CategoryType;

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
