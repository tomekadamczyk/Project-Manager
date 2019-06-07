import React from 'react';
import styled from 'styled-components';


const TogglerWrapper = styled.div`
    cursor: pointer;
    padding: 30px 10px;
    background: #0000cc;
    transition-duration: .2s;
    margin-bottom: 30px;

    &.active {
        background: #000099;
    }

    &:hover {
        background: #000099;
    }
`;

const Button = styled.div`
    width: 35px;
    height: 3px;
    background: #fff;
    margin: auto;
    position: relative;
    border-radius: 5px;
    transition-duration: .2s;
    transition-delay: .1s;

    &:before {
        content: '';
        width: 35px;
        height: 3px;
        background: #fff;
        top: -7px;
        position: absolute;
        border-radius: 5px;
        transition-duration: .2s;
        transition-delay: .3s;
    }

    &:after {
        content: '';
        width: 35px;
        height: 3px;
        background: #fff;
        top: 7px;
        position: absolute;
        border-radius: 5px;
        transition-duration: .2s;
        transition-delay: .5s;
    }

    &.active {
        width: 15px;

        &:after {
            width: 20px;
        }

        &:before {
            width: 10px;
        }
    }
`;

const Toggler = (props) => {

    return (
        <TogglerWrapper className={props.isMenuOpened ? 'active' : ''} onClick={props.openMenu}>
            <Button className={props.isMenuOpened ? 'active' : ''} />
        </TogglerWrapper>
    )
}

export default Toggler;