import React from 'react';
import styled from 'styled-components';

const Element = styled.button`
    border: transparent;
    border-radius: 20px;
    padding: 10px 20px;
    color: #fff;
    background: #fa4;
    transition: background .3s;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background: #f14;
    }

    &:active {
        background: #f1f1f1;
    }
`;

const Button = (props) => {
    return (
        <Element onClick={props.click}>{props.children}</Element>
    )
}

export default Button;