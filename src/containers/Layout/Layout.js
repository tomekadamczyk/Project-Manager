import React, {Component} from 'react';
import Sidemenu from '../../components/Navigation/Sidemenu/Sidemenu';
import styled from 'styled-components';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Header from '../../components/Header/Header';

const Main = styled.main`
    width: calc(100% - 85px);
    position: relative;
    left: 65px;
    padding: 10px;

    &.toHide {
        z-index: 9001;
    }
`;


class Layout extends Component {
    state = {
        showSideMenu: false,
        backdropInVisible: true
    }

    toggleMenuState = () => {
        let backdropState = this.state.backdropInVisible;
        this.setState({backdropInVisible: !backdropState})
    }

    render() {
        
        let mainView = <>
            <Sidemenu 
            opened={!this.state.backdropInVisible}
            open={this.toggleMenuState}>
                back
            </Sidemenu>
                <Header></Header>
            <Main className={this.state.backdropInVisible ? 'toHide' : ''}>
                {this.props.children}
            </Main>
        </>
        if(!this.state.backdropInVisible) {
            mainView = <>
            {mainView}
            <Backdrop menuOpened={this.state.backdropInVisible} closeMenu={this.toggleMenuState}/>
            </>
        }

        return (
            <>
           {mainView}
           </>
        )
    }
}

export default Layout;