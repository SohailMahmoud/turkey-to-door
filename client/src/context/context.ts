import { createContext, useContext } from 'react';
import { Basket } from '../models/basket';

interface StoreContextValue {
    basket: Basket | undefined;
    setBasket: React.Dispatch<React.SetStateAction<Basket | undefined>>;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Oops - we are not inside the app.tsx so we do not have access to the context');
    }

    return context;
}