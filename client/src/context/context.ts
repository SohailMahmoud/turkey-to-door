import { createContext, useContext } from 'react';
import { Basket } from '../models/basket';
import { User } from '../models/user';

interface StoreContextValue {
    basket: Basket | undefined;
    setBasket: React.Dispatch<React.SetStateAction<Basket | undefined>>;
}
interface UserContextValue {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

// Store Context
export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Oops - we are not inside the app.tsx so we do not have access to the context');
    }

    return context;
}

// User Context
export const UserContext = createContext<UserContextValue | undefined>(undefined);

export function useUserContext() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw Error('Oops - we are not inside the app.tsx so we do not have access to the context');
    }

    return context;
}
