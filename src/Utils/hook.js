import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const onChange = (e) => {
        console.log(e.target.name);
        setValues({...values, [e.target.name]: e.target.value});
    };
    const onSubmit = event => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}