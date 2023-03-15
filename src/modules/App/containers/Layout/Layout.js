import React, {Component, useState} from 'react';
import {Sidemenu} from '../../components/Navigation/Sidemenu/Sidemenu';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import { Toaster } from 'modules/App/components/Toaster/Toaster';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import NavigationIcons from '../../components/Navigation/NavigationItems/NavigationIcons/NavigationIcons';

const Main = styled.main`
    width: calc(100% - 65px);
    position: relative;
    left: 65px;
    padding: 10px;
`;

function Layout({ children }) {

    return (
        <>
            <Sidemenu />
            <Header />
            <Main>
                <Toaster />
                {children}
            </Main>
        </>
    )
}

export default Layout;