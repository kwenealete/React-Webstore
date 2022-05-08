import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
    //creating a state object for our inputs

    const [inputs, setInputs] = useState(initial);
    const initialValues = Object.values(initial).join('');

    useEffect(() => {
        //it runs when changes occurs on things we are watching
        setInputs(initial);
    }, [initialValues]);

    function handleChange(e) {
        let { value, name, type } = e.target;

        if(type === 'number') {
            value = parseInt(value);
        }

        if(type === 'file') {
            [value] = e.target.files;
        }

        setInputs({
            //copy existing state
            ...inputs,
            [name]: value,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']));
        setInputs(blankState);
    }

    //return things we want to surface from this hook

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    };
}