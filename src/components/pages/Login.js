import React, {useContext, useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag'
import { useForm } from '../../Utils/hook';
import { AuthContext } from '../../context/auth';

const Login = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading}] = useMutation(Login_User, {
        update(_, { data: { login: userData }}) {
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

    function loginUserCallback() {
        loginUser();
    }
 
    return (
    <div className= "form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? "loading": ''}>
            <h1>Login</h1>
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
                label = "Password"
                placeholder="Password.."
                name = "password"
                type = "password"
                value={values.password}
                error = {errors.password ? true : false}
                onChange={onChange}
            />
            <Button type = "submit" primary>
                Login
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

const Login_User = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            loginInput: {
                username: $username
                password: $password
            }
        ){
            id email username createdAt token
        }
    }
`

export default Login;