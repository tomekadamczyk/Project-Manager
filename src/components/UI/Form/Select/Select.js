import React from 'react';
import styled from 'styled-components';

const Area = styled.select`
    margin-right: 15px;
    margin-bottom: 15px;
    padding: 6px 10px;

    background-color: white;
    border: thin solid blue;
    border-radius: 4px;
    display: inline-block;
    line-height: 1.5em;
    width: 100%;

    -webkit-appearance: none;
    -moz-appearance: none;

    background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;

    &:focus {
        background-image: linear-gradient(45deg, green 50%, transparent 50%), linear-gradient(135deg, transparent 50%, green 50%), linear-gradient(to right, #ccc, #ccc);
        background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, calc(100% - 2.5em) 0.5em;
        background-size: 5px 5px, 5px 5px, 1px 1.5em;
        background-repeat: no-repeat;
        border-color: green;
        outline: 0;
    }
`;

const Select = React.forwardRef((props, ref) => {
    return(
        <Area onChange={props.update} ref={ref}>{props.children}</Area>
    )
})

export default Select;