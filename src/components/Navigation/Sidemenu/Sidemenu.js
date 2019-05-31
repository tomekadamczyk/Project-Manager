import React from 'react';
import styled from 'styled-components';
import Toggler from '../Toggler/Toggler';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationIcons from '../NavigationItems/NavigationIcons/NavigationIcons';

const Container = styled.aside`
    height: 100vh;
    max-width: 400px;
    position: fixed;
`;

const BasicColumn = styled.div`
    height: 100%
    background: #fc3;
    width: 65px;
    z-index: 100;
    position: relative;
    transition-duration: .4s;
`;

const SlidingColumn = styled.div`
    height: 100%
    background: #fff;
    width: 300px;
    position: absolute;
    left: -500%;
    top: 0;
    transition-duration: .5s;
    z-index: 90;
    padding: 94px 0;

    &.active {
        left: 65px;
        box-shadow: 1px 1px 45px 5px #ccc;
    }
`;

const Sidemenu = (props) => {
    return (
        <Container>
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