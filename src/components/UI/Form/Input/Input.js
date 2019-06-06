import React from 'react';
import styled from 'styled-components';


const Area = styled.input`
    border: none;
    color: #000;
    font-size: 20px;
    padding: 7px 10px;
    background: #f0f0f0;
    display: block;
    transition: background .3s, border .3s linear .3s;

    &:focus {
        background: #fff;
        border: 1px solid #ccc;
        color: #000;
    }
`;

const Input = React.forwardRef((props, ref) => {
    return(
        <Area onBlur={props.blur} type="text" placeholder={props.placeholder} defaultValue={props.defaultValue} ref={ref}/>
    )
})

export default Input;