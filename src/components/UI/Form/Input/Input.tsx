import React, { ChangeEvent } from 'react';
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

interface InputProps {
    placeholder: string;
    defaultValue?: string;
    onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef(({ placeholder, defaultValue, onChangeCallback}: InputProps, ref) => {
    return(
        <Area onBlur={onChangeCallback} type="text" placeholder={placeholder} defaultValue={defaultValue} ref={ref}/>
    )
})

export default Input;