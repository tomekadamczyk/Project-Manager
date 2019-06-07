import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styled from 'styled-components';

const Nav = styled.nav`
    height: 100%;
`;

const NavigationItems = (props) => {
    return (
        <Nav>
            <NavigationItem closeMenu={props.closeMenu} link="/" exact>Dashboard</NavigationItem>
            <NavigationItem closeMenu={props.closeMenu} link="/projects" >Projects</NavigationItem>
            <NavigationItem closeMenu={props.closeMenu} link="/kanban" >Kanban</NavigationItem>
            <NavigationItem closeMenu={props.closeMenu} link="/tasks" >Tasks</NavigationItem>
            <NavigationItem closeMenu={props.closeMenu} link="/clients" >Clients</NavigationItem>
        </Nav>
    )
}

export default NavigationItems;