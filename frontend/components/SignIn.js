import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password){
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    email
                    name
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    }
`;

export default function SignIn() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: ''
    });

    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(inputs);
        const res = await signin();
        console.log(res);
        

        // Send the email and password to graphqlAPI
        
    }
    const error = data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure" ? data?.
    authenticateUserWithPassword : undefined;

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Into Your Account</h2>
            <Error error={data?.authenticateUserWithPassword} />
            <fieldset>
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
                        placeholder="Enter your password "
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}

                    />
                </label>
                <button type="submit">Sign In!</button>
            </fieldset>
        </Form>
    );
    
}