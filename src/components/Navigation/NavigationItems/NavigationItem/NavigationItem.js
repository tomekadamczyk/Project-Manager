import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavItem = styled.div`
    padding: 11px 36px;

    &:hover {
        background: #ddd;
    }

    a {
        text-decoration: none;
        color: inherit;
        font-size: 14px;
    }
`;

const NavigationItem = (props) => {
    return (
        <NavItem>
            <NavLink onClick={props.closeMenu} to={props.link} exact={props.exact}>{props.children}</NavLink>
        </NavItem>
    )
}

export default NavigationItem;