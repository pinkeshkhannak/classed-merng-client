import React, {useContext, useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag'
import { useForm } from '../../Utils/hook';
import { AuthContext } from '../../context/auth';

const Register = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { loading}] = useMutation(Register_User, {
        update(_, { data: { register: userData }}) {
            context.login(userData)
           navigate('/');
        },
        onError(err) {
            console.log(err);
            if(err)
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }
 
    return (
    <div className= "form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? "loading": ''}>
            <h1>Register</h1>
            <Form.Input
                label = "Username"
                placeholder="Username.."
                name = "username"
                type = "text"
                value={values.username}
                error = {errors.username ? true : false}
                onChange={onChange}
            />
            <Form.Input
                label = "Email"
                placeholder="Email.."
                name = "email"
                type = "email"
                value={values.email}
                error = {errors.email ? true : false}
                onChange={onChange}
            />
            <Form.Input
                label = "Password"
                placeholder="Password.."
                name = "password"
                type = "password"
                value={values.password}
                error = {errors.password ? true : false}
                onChange={onChange}
            />
            <Form.Input
                label = "ConfirmPassword"
                placeholder="ConfirmPassword.."
                name = "confirmPassword"
                type = "password"
                value={values.confirmPassword}
                error = {errors.confirmPassword ? true : false}
                onChange={onChange}
            />
            <Button type = "submit" primary>
                Register
            </Button>
        </Form>
        {Object.keys(errors) && (
            <div className = "ui error messages">
            <ul className = "list">
                {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                ))}
            </ul>
        </div>
        )}
    </div>
    )
}

const Register_User = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;