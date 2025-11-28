'use client';
import { CartType } from '@/queries/cart';
import { Dispatch, ReactNode, createContext, useReducer } from 'react';

interface AddActionType {
    type: 'ADD';
    payload: CartType;
}

interface DeleteActionType {
    type: 'DELETE';
    payload: number;
}

interface ClearActionType {
    type: 'CLEAR';
}

type ActionType = AddActionType | DeleteActionType | ClearActionType;

interface CartContextType {
    cart: CartType | undefined;
    dispatch: Dispatch<ActionType>;
}

const CartContext = createContext<CartContextType>({
    cart: {} as CartType,
    dispatch: () => {}
});

const cartReducer = (cart: CartType | undefined, action: ActionType) => {
    switch (action.type) {
        case 'ADD': {
            return { ...action.payload };
        }

        case 'DELETE': {
            return {
                ...cart,
                cartItems: cart?.cartItems.filter(
                    (item) => item.gameId !== action.payload
                )
            } as CartType;
        }

        case 'CLEAR': {
            return { ...cart, cartItems: [] } as CartType;
        }

        default: {
            return cart;
        }
    }
};

const CartContextProvider = ({
    children,
    initialCart
}: {
    children: ReactNode;
    initialCart: CartType | undefined;
}) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    return <CartContext value={{ cart, dispatch }}>{children}</CartContext>;
};

export { CartContext, CartContextProvider };
