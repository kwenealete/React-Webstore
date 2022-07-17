import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!,) {
        sendUserPasswordResetLink (email: $email) {
            code
            message
            
        }
    }
`;

export default function RequestReset() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const [signup, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
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
            <h2>Forgotten your password? Request a new password</h2>
            <Error error={error} />
            <fieldset>
                {data?.sendUserPasswordResetLink === null && (<p> Success! Check email for link </p>)}
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
                
                <button type="submit">Request Reset!</button>
            </fieldset>
        </Form>
    );
    
}

export { REQUEST_RESET_MUTATION };