import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
    color: #fff;
    padding: 8px;
    font-size: 20px;
    text-align: center;
    position: relative;
    cursor: pointer;

    &:hover {
        background: #dac;
    }

    &:last-child {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 15px;

        &:hover {
            ul {
                opacity: 1;
                transform: translateX(0);
            }
        }
    }
`;

const NavigationIcon = (props) => {
    return (
        <Icon>{props.children}</Icon>
    )
}

export default NavigationIcon;