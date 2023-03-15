import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styled from 'styled-components';
import Constants from '../../../constants/constants';

const Nav = styled.nav`
    height: 100%;
`;

const NavigationItems = () => {
    const authToken = localStorage.getItem(Constants.AUTH_TOKEN)

    return (
        <Nav>
            <NavigationItem link="/">Dashboard</NavigationItem>
            <NavigationItem link="/projects" >Projects</NavigationItem>
            <NavigationItem link="/kanban" >Kanban</NavigationItem>
            <NavigationItem link="/tasks" >Tasks</NavigationItem>
            <NavigationItem link="/clients" >Clients</NavigationItem>
            {authToken ? 
            <NavigationItem onClick={() => localStorage.removeItem(Constants.AUTH_TOKEN)} link="/login">Logout</NavigationItem> 
            :
            <NavigationItem link="/login">Login</NavigationItem>}
            
        </Nav>
    )
}

export default NavigationItems;