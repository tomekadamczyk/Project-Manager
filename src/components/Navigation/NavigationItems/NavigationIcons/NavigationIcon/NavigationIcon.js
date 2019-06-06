import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
    color: #fff;
    padding: 8px;
    font-size: 20px;
    text-align: center;
    position: relative;

    &:hover {
        background: #dac;
    }
`;

const NavigationIcon = (props) => {
    return (
        <Icon>{props.children}</Icon>
    )
}

export default NavigationIcon;