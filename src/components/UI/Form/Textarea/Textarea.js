import React from 'react';
import styled from 'styled-components';

const Area = styled.textarea`
    height: 300px;
    width: 100%;
    border: none;
    font-size: 14px;

    &:focus {
        border: 1px solid #ddd;
    }
`;

const TextArea = React.forwardRef((props, ref) => {
    return(
        <Area onBlur={props.updateDescription} type="text" placeholder={props.placeholder} defaultValue={props.defaultValue} ref={ref}/>
    )
})

export default TextArea;