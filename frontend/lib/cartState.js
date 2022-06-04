import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
    // Our customised custom provider! data (state) will be stored here with functionality (updaters) and made accessible via the consumer

    // Closed cart by default
    const [cartOpen, setCartOpen] = useState(false);

    function toggleCart() {
        setCartOpen(!cartOpen);
    }

    function closeCart() {
        setCartOpen(false);
    }

    function openCart() {
        setCartOpen(true);
    }

    return (
        <LocalStateProvider
            value={{
                cartOpen,
                setCartOpen,
                toggleCart,
                closeCart,
                openCart
            }} >
            {children}
        </LocalStateProvider>
    );
}

// Make a custom hook for accessing the cart local state
function useCart() {
    // Using a consumer to access the local state
    const all = useContext(LocalStateContext);
    return all;
}
export { CartStateProvider, useCart };