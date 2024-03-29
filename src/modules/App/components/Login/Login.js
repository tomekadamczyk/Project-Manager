import React, { Component } from 'react';
import Constants from '../../constants/constants';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '../UI/Button/Button';
import Validator from '../Validator/Validator';

import { graphql, compose } from 'react-apollo';
import gql from "graphql-tag";
import { ADD_USER } from 'queries/mutation/addUser';
import { LOGIN } from 'queries/mutation/login';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
        token
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

    error = {
        email: null,
        password: null
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
            this.error.email = 'Wpisz poprawny adres e-mail';
            }
        if(regex.test(email) || email === '') {
            this.setState({showValidator: false})
            this.error.email = null;
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
                        {login ? console.log(this.props) : null}
                        <Input 
                            id="name" 
                            defaultValue={name} 
                            onChange={(e) => {
                                this.validateName(e);
                                this.setState({name: e.target.value})}
                            }/>
                            <Validator information={this.error.email}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="login">Email address</InputLabel>
                        <Input 
                            id="login" 
                            aria-describedby="login-helper-text" 
                            defaultValue={email} 
                            onChange={ (e) => {
                                this.validateEmail(e)
                                this.setState({email: e.target.value})}
                            }/>
                        <FormHelperText d="login-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                    <WithMargin>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                            id="password" 
                            aria-describedby="my-helper-text" 
                            defaultValue={password} 
                            onChange={(e) => this.setState({password: e.target.value})}/>
                    </WithMargin>
                        <Button click={login ? (e) => {this.props.onAuthenticate(); this.submitLogin(e)} : (e) => this.submitSignup(e)}>
                            {login ? 'login' : 'create account'}
                        </Button>
                </Form>
                    <Button click={() => this.setState({login: !login})}>{login ? 'need to create an account?' : 'already have an account?'}</Button>
            </Wrapper>
        )
    }
    

    submitLogin = (e) => {
        e.preventDefault();
        this.props.LoginMutation({
            variables: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
        })
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
        localStorage.setItem(Constants.AUTH_TOKEN, token)
    }
}

export default compose(
    graphql(ADD_USER, {name: 'AddUser'}),
    graphql(LOGIN, {name: 'LoginMutation'})
)(Login);