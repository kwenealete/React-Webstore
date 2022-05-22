import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($email: String!,$token: String!, $password: String!,) {
        redeemUserPasswordResetToken (email: $email, token: $token, password: $password) {
            code
            message
            
        }
    }
`;

export default function Reset({token}) {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        token
    });

    const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
        variables: inputs,
       
    });

    const succesfulError = data?.redeemUserPasswordResetToken?.code ? data?.redeemUserPasswordResetToken : undefined;

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(inputs);
        const res = await reset().catch(console.error);
        console.log(res);
        resetForm();
        
    }
   
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <Error error={error || succesfulError} />
            <fieldset>
                {data?.sendUserPasswordResetLink === null && (<p> Success! You can now sign in </p>)}
                <label htmlFor="email">
                    Email
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}

                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}

                    />
                </label>
                <button type="submit">Request Reset!</button>
            </fieldset>
        </Form>
    );
    
}