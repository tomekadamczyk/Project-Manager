import React from 'react';
import styled from 'styled-components';
import Toggler from '../Toggler/Toggler';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationIcons from '../NavigationItems/NavigationIcons/NavigationIcons';
import Backdrop from '../../UI/Backdrop/Backdrop';

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
    transform: translateX(-500%);
    left: 65px;
    top: 0;
    transition: transform 1s;
    z-index: 90;
    padding: 94px 0;

    &.active {
        transform: translateX(0);
        z-index: 9001;
        box-shadow: 1px 1px 45px 5px #ccc;
    }
`;

const Sidemenu = (props) => {
    let backdrop = null;

    if(props.opened) {
        backdrop = <Backdrop menuOpened={props.opened} closeMenu={props.open}/>;
    }

    return (
        <Container>
        {backdrop}
            <BasicColumn>
                <Toggler isMenuOpened={props.opened} openMenu={props.open} />
                <NavigationIcons />
            </BasicColumn>
            <SlidingColumn className={props.opened ? 'active' : ''}>
                <NavigationItems></NavigationItems>
            </SlidingColumn>
        </Container>
    )
}

export default Sidemenu;