import React, { Component } from 'react';
import { AUTH_TOKEN } from '../../constants/constants'
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '../UI/Button/Button';

import {Mutation} from 'react-apollo';
import gql from "graphql-tag";
import { async } from 'q';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
        token
        }
    }
`;


const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
    padding: 20px;
    border: 1px solid darkblue;
    width: 400px;
    margin: 80px auto auto;
`;

const WithMargin = styled(FormControl)`
    margin: 20px 0 30px!important;
`;

class Login extends Component {

    state = {
        login: false,
        email: null,
        password: null
    }

    render() {
        const { login, email, password } = this.state;
        console.log(localStorage)
        return (
            <Wrapper>
                <h3>{login ? 'Login' : 'Sign Up!'}</h3>
                <Form>
                    <FormControl>
                        <InputLabel htmlFor="login">Email address</InputLabel>
                        <Input id="login" aria-describedby="login-helper-text" defaultValue={email} onChange={(e) => this.setState({email: e.target.value})}/>
                        <FormHelperText id="login-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                    <WithMargin>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" aria-describedby="my-helper-text" defaultValue={password} onChange={(e) => this.setState({password: e.target.value})}/>
                    </WithMargin>
                    <Button click={() => this._confirm()}>
                        {login ? 'login' : 'create account'}
                    </Button>
                    <Mutation
                        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                        variables={{ email, password, }}
                        onCompleted={data => this._confirm(data)}>
                        {mutation => (
                        <Button onClick={mutation}>
                            {login ? 'login' : 'create account'}
                        </Button>
                        )}
                    </Mutation>
                    <Button click={() => this.setState({login: !login})}>{login ? 'need to create an account?' : 'already have an account?'}</Button>
                </Form>
            </Wrapper>
        )
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push(`/`)
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default Login;