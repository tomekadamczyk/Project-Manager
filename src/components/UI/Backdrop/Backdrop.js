import React from 'react';
import styled from 'styled-components';

const Drop = styled.div`
    width: calc(100% - 65px);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 65px;
    z-index: 8000;
    background: rgba(0,0,0,0.1);
    transition-duration: .1s;
`;

const Backdrop = (props) => {
    return(
        <Drop onClick={props.closeMenu}></Drop>
    )
}

export default Backdrop;