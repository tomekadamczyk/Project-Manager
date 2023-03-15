import React, { ReactNode, useEffect, useState } from "react";
import styled from 'styled-components';
import Toggler from '../Toggler/Toggler';
import Backdrop from '../../UI/Backdrop/Backdrop';

interface ExpandableSidebarProps {
    navIcons: ReactNode;
    navItems: ReactNode;
}

const Container = styled.aside`
    height: 100vh;
    max-width: 400px;
    position: fixed;
    z-index: 9003;
`;

const BasicColumn = styled.div`
    height: 100%
    background: #0099ff;
    width: 65px;
    z-index: 9002;
    position: relative;
`;


const SlidingColumn = styled.div`
    height: 100%
    background: #fff;
    width: 300px;
    position: absolute;
    transform: translateX(-150%);
    left: 65px;
    top: 0;
    transition: transform .7s;
    z-index: 90;
    padding: 94px 0;

    &.active {
        transform: translateX(0);
        z-index: 9001;
        box-shadow: 1px 1px 45px 5px #ccc;
    }
`;

export function ExpandableSidebar({ navIcons, navItems }: ExpandableSidebarProps) {

    const [backdropInVisible, setBackdropInVisible] = useState(false);

    function toggleMenuState() {
        setBackdropInVisible(prev => !prev)
    }

    return (
        <Container>
            <BasicColumn>
                <Toggler isMenuOpened={backdropInVisible} openMenu={toggleMenuState} />
                { navIcons }
            </BasicColumn>
            
            <SlidingColumn onClick={toggleMenuState} className={backdropInVisible ? 'active' : ''}>
                { navItems }
            </SlidingColumn>
            {backdropInVisible ? <Backdrop menuOpened={backdropInVisible} closeMenu={toggleMenuState} /> : null}
        </Container>
    )
}