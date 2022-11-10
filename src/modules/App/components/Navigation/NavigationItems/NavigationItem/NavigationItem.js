import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
            <Link onClick={props.closeMenu} to={props.link} exact={props.exact}>{props.children}</Link>
        </NavItem>
    )
}

export default NavigationItem;