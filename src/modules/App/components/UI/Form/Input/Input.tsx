import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify'; 


const Area = styled.input`
    border: none;
    color: #000;
    font-size: 20px;
    padding: 7px 10px;
    background: #f0f0f0;
    display: block;
    transition: background .3s, border .3s linear .3s;
    border: 1px solid transparent;

    &:focus {
        background: #fff;
        border: 1px solid #ccc;
        color: #000;
    }
`;

interface InputProps {
    placeholder: string;
    defaultValue?: string;
    testid: string;
    onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef(({ testid, placeholder, defaultValue, onChangeCallback}: InputProps, ref) => {

    function callb(e: ChangeEvent<HTMLInputElement>) {
          const sanitizedBlog=DOMPurify.sanitize(e.target.value)
        e.target.value = sanitizedBlog
        onChangeCallback(e);
    }
    return(
        <Area data-testid={testid} onBlur={callb} type="text" placeholder={placeholder} defaultValue={defaultValue} ref={ref}/>
    )
})

export default Input;