import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';


// Creating logged out mocks, loggedIn mocks and logged in with cart items mocks

const notSignedInMocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { authenticatedItem: null } },
    },
];

const signedInMocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { authenticatedItem: fakeUser() } },
    },
];

const signedInMocksWithCartItems = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { authenticatedItem: fakeUser({
            cart: [ fakeCartItem()],
        }) } },
    },
];

describe('<Nav/>', () => {
    it('Renders a minimal nav when signed out', () => {
        const { container, debug } = render (
            <CartStateProvider>
                <MockedProvider mocks={notSignedInMocks} >
                    <Nav />
                </MockedProvider>
            </CartStateProvider>
        );
        debug();
        expect(container).toHaveTextContent('Sign In');
        expect(container).toMatchSnapshot();
        const link = screen.getByText('Sign In');
        expect(link).toHaveAttribute('href', '/signin');
        const productsLink = screen.getByText('Products');
        expect(productsLink).toBeInTheDocument();
        expect(productsLink).toHaveAttribute('href', '/products');
    });
    
    it('Renders a full nav when signed in', async() => {
        const { container, debug } = render (
            <CartStateProvider>
                <MockedProvider mocks={signedInMocks} >
                    <Nav />
                </MockedProvider>
            </CartStateProvider>
        );
        await screen.findByText('Account');
        expect(container).toHaveTextContent('Sign Out');
        expect(container).toHaveTextContent('My Cart');
        expect(container).toMatchSnapshot();
    });

    it('Renders the amount of items in the cart', async () => {
        const { container, debug } = render (
            <CartStateProvider>
                <MockedProvider mocks={signedInMocksWithCartItems} >
                    <Nav />
                </MockedProvider>
            </CartStateProvider>
        );
        await screen.findByText('Account');
        expect(screen.getByText('3')).toBeInTheDocument();
    });
});