import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import SickButton from './styles/SickButton';
import { useState } from 'react';
import nProgress from 'nprogress';

const CheckoutFormStyles = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    
    async function handleSubmit(e) {

        // Stop form from submitting and turn the loader on
        e.preventDefault();
        setLoading(true);
        console.log('work to be done');

        // Start the page transition
        nProgress.start();

        // Create payment method via stripe
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });
        console.log(paymentMethod);
        
        // Handle any stripe errors
        if (error) {
            setError(error);
        }
        //
        //
        //
        //
        setLoading(false);
        nProgress.done();
        
    }

    return (
            <CheckoutFormStyles onSubmit={handleSubmit}>
                {error && <p style={{fontSize: 12}}>{error.message}</p>}
                <CardElement />
                <SickButton>Check Out Now</SickButton>
            </CheckoutFormStyles>
              
    );
}

function Checkout() {
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm />
        </Elements>
    )
}

export { Checkout }