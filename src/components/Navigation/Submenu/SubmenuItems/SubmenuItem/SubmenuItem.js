import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavItem = styled.div`
    padding: 7px 20px;

    &:hover {
        background: #fa4;

        a {
            color: #fff;
        }
    }

    a {
        text-decoration: none;
        color: #000;
        font-size: 14px;
    }
`;

const SubmenuItem = (props) => {
    return (
        <NavItem>
            <NavLink to={props.link} exact={props.exact}>{props.children}</NavLink>
        </NavItem>
    )
}

export default SubmenuItem;