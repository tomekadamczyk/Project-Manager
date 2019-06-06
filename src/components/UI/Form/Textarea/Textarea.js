import React from 'react';
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

    &:focus {
        background: #fff;
        border: 1px solid #ccc;
    }
`;

const TextArea = React.forwardRef((props, ref) => {
    return(
        <Area onBlur={props.updateDescription} type="text" placeholder={props.placeholder} defaultValue={props.defaultValue} ref={ref}/>
    )
})

export default TextArea;