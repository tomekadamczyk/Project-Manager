import React from 'react';
import styled from 'styled-components';

const Area = styled.input`
    margin-right: 15px;
    margin-bottom: 15px;
    padding: 6px 10px;

`;

const Checkbox = React.forwardRef((props, ref) => {
    return(
        <>
            <label htmlFor={props.id}>{props.name}</label>
            <Area onChange={props.update} id={props.id} type="checkbox" ref={ref}></Area>
        </>
    )
})

export default Checkbox;