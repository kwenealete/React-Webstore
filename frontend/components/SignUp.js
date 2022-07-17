import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        createUser (data: {
            email: $email, name: $name, password: $password
        }) {
            id
            email
            name
        }
    }
`;

export default function SignUp() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: ''
    });

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
       
    });

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(inputs);
        const res = await signup().catch(console.error);
        console.log(res);
        resetForm();
        
    }
   
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up For An Account</h2>
            <Error error={error} />
            <fieldset>
                {data?.createUser && <p>Signed up with {data.createUser.email}- please log in. </p>}
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
                <label htmlFor="name">
                    Your Name
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        autoComplete="name"
                        value={inputs.name}
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
                <button type="submit">Sign Up!</button>
            </fieldset>
        </Form>
    );
    
}

export { SIGNUP_MUTATION };