import React, { Component } from 'react';
import { AUTH_TOKEN } from '../../constants/constants'
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '../UI/Button/Button';
import Validator from '../Validator/Validator';

import {Query, Mutation, graphql} from 'react-apollo';
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


const addUserMutation = gql`
    mutation addUser ($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password){
            name
        }
    }
`;

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
        name: null,
        email: null,
        password: null,
        showValidator: false
    }

    validateName = (e) => {
        var splitStr = e.target.value.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        console.log(splitStr)
        return splitStr.join(' '); 
    }

    validateEmail = (e) => {
        var email = e.target.value;
        var regex = /[A-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}/

        if(!regex.test(email)){
            this.setState({showValidator: true})
            }
        if(regex.test(email) || email === '') {
            this.setState({showValidator: false})
        }
    }

    render() {
        const { login, name, email, password } = this.state;
        return (
            <Wrapper>
                <h3>{login ? 'Login' : 'Sign Up!'}</h3>
                <Form>
                    <FormControl>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" defaultValue={name} onChange={(e) => {
                                                                    this.validateName(e);
                                                                    this.setState({name: e.target.value})}
                                                                }/>
                            {this.state.showValidator ? <Validator information={'błąd'}/> : null}
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="login">Email address</InputLabel>
                        <Input id="login" aria-describedby="login-helper-text" defaultValue={email} onChange={ (e) => {
                                                                            this.validateEmail(e)
                                                                            this.setState({email: e.target.value})}
                                                                        }/>
                        <FormHelperText id="login-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                    <WithMargin>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" aria-describedby="my-helper-text" defaultValue={password} onChange={(e) => this.setState({password: e.target.value})}/>
                    </WithMargin>
                        <Button click={(e) => this.submitSignup(e)}>
                            {login ? 'login' : 'create account'}
                        </Button>
                </Form>
                    <Button click={() => this.setState({login: !login})}>{login ? 'need to create an account?' : 'already have an account?'}</Button>
            </Wrapper>
        )
    }


    submitSignup = (e) => {
        e.preventDefault();
        this.props.AddUser({
            variables: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
        })
        this.props.history.push(`/`)
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

export default graphql(addUserMutation, {
    name: 'AddUser'
})(Login);