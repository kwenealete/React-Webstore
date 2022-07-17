import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';


const product = fakeItem();

const mocks = [
    {
        //When this query and variable combo is requested
        request: {
            query: SINGLE_ITEM_QUERY,
            variables: { id: '123' },
        },
        //Return this data
        result: {
            data: {
                Product: product,
            },
        },
    },
];

describe('<Single Product/>', () => {
    it('renders with proper data', async() => {
        //Creating some fake data

        const { container, debug } = render(
            <MockedProvider mocks={mocks}>
                <SingleProduct id='123' />
            </MockedProvider>
        );
        await screen.findByTestId('singleProduct');
        expect(container).toMatchSnapshot();
    });

    it('Errors out when an item is not found', async() => {
        const errorMock = [{
            request: {
                query: SINGLE_ITEM_QUERY,
                variables: { id: '123' },
            },

            results: {
                errors: [{ message: 'item not found' }]
            },
        }]; 

        const { container, debug } = render (
            <MockedProvider mocks={errorMock}>
                <SingleProduct id="123" />
            </MockedProvider>
        );
        await screen.findByTestId('graphql-error');
        expect(container).toMatchSnapshot();
        expect(container).toHaveTextContent('Shoot!');
        
    })
});