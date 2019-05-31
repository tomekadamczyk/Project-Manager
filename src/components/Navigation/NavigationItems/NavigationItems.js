import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styled from 'styled-components';

const Nav = styled.nav`
    height: 100%;
`;

const NavigationItems = (props) => {
    return (
        <Nav>
            <NavigationItem link="/" exact>Dashboard</NavigationItem>
            <NavigationItem link="/projects" >Projects</NavigationItem>
            <NavigationItem link="/kanban" >Kanban</NavigationItem>
            <NavigationItem link="/tasks" >Tasks</NavigationItem>
            <NavigationItem link="/clients" >Clients</NavigationItem>
        </Nav>
    )
}

export default NavigationItems;