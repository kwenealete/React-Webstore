import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset';

const email = 'alete@yahoo.com';

const mocks = [
    {
        request: {
            query: REQUEST_RESET_MUTATION,
            variables: {email},
        },
        result: {
            data: { sendUserPasswordResetLink: null }
        },
    },
];

describe('<RequestReset />', () => {
    it('Renders and matches snapshot', () => {
        const { container, debug } = render (
            <MockedProvider>
                <RequestReset />
            </MockedProvider>
        );
        expect(container).toMatchSnapshot();
    });

    it('Calls the mutation when requested', async() => {
        const{ container, debug } = render(
            <MockedProvider mocks={mocks} >
                <RequestReset />
            </MockedProvider>
        );
         // type into the email box
        userEvent.type(screen.getByPlaceholderText(/email/i), email);
        // click submit
        userEvent.click(screen.getByText(/Request Reset!/));
        const success = await screen.findByText(/Success/i);
        expect(success).toBeInTheDocument();
    });
})