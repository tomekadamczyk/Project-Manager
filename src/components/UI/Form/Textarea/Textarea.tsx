import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const Area = styled.textarea`
    height: 300px;
    width: 95%;
    border: none;
    font-size: 14px;
    padding: 7px 10px;
    background: #f0f0f0;
    margin-top: 20px;
    transition: background .3s, border .3s linear .3s;
    border: 1px solid transparent;

    &:focus {
        background: #fff;
        border: 1px solid #ccc;
    }
`;

interface TextAreaPros {
    placeholder: string;
    onChangeCallback?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    defaultValue?: string;
}

const TextArea = React.forwardRef(({ onChangeCallback, placeholder, defaultValue}: TextAreaPros, ref) => {
    return(
        <Area onBlur={onChangeCallback} type="text" placeholder={placeholder} defaultValue={defaultValue} ref={ref}/>
    )
})

export default TextArea;