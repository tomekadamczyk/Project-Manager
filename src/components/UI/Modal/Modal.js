import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed;
    width: 77%;
    background: #fff;
    border-radius: 5px;
    top: 0;
    bottom: 0;
    z-index: 80;
    padding: 20px;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: 1px 4px 17px 5px #ccc;

    display: flex;
    justify-content: space-between;
    flex-flow: column;

    @media (min-width: 1024px) {
        flex-flow: row;
        height: 83%;
    }
`;

const Modal = (props) => {

    return (
        <ModalContainer>
            {props.children}
        </ModalContainer>
    )
}

export default Modal;