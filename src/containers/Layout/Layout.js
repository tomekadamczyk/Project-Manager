import React, {Component} from 'react';
import Sidemenu from '../../components/Navigation/Sidemenu/Sidemenu';
import styled from 'styled-components';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

const Main = styled.main`
    width: calc(100% - 140px);
    position: relative;
    left: 65px;
    padding: 20px;

    &.toHide {
        z-index: -1;
    }
`;


class Layout extends Component {
    state = {
        showSideMenu: false
    }

    toggleMenuState = () => {
        let menuState = this.state.showSideMenu;
        this.setState({showSideMenu: !menuState})
    }

    render() {
        return (
            <>
            <Sidemenu 
            opened={this.state.showSideMenu}
            open={this.toggleMenuState}>
            </Sidemenu>
            <Main className={this.state.showSideMenu ? 'toHide' : ''}>
                {this.props.children}
                <Backdrop menuOpened={this.state.showSideMenu} closeMenu={this.toggleMenuState}/>
            </Main>
            </>
        )
    }
}

export default Layout;