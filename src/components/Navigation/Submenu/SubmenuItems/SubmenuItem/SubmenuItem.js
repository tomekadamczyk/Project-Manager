import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavItem = styled.div`
    padding: 7px 20px;

    &:hover {
        background: #000099;

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
            <Link to={props.link} >{props.children}</Link>
        </NavItem>
    )
}

export default SubmenuItem;