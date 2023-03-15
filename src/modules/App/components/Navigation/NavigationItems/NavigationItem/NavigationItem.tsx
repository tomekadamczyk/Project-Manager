import React, { ReactNode, RefAttributes } from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

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

interface NavigationItemProps {
    onClick?: () => void;
    children: ReactNode;
    link: any;
}

const NavigationItem = ({ onClick, link, children}: NavigationItemProps) => {
    return (
        <NavItem>
            <Link onClick={onClick} to={link} >{children}</Link>
        </NavItem>
    )
}

export default NavigationItem;