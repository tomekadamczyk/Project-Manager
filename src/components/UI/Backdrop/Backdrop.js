import React from 'react';
import styled from 'styled-components';

const Drop = styled.div`
    width: calc(100% - 365px);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 365px;
    z-index: -1;
    background: rgba(0,0,0,0.1);
    visibility: hidden;
    opacity: 0;
    transition-duration: .3s;
    transition-delay: .3s;

    &.active {
        visibility: visible;
        opacity: 1;
        z-index: 9999;
    }
`;

const Backdrop = (props) => {
    return(
        <Drop className={props.menuOpened ? 'active' : ''} onClick={props.closeMenu}></Drop>
    )
}

export default Backdrop;