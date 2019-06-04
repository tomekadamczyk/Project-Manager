import React from 'react';
import styled from 'styled-components';

const LI = styled.li`
    padding: 7px 5px;
    border-bottom: 1px solid #ccc;
    transition: background .3s;

    &:hover {
        background: #f1f1f1;
    }
`;

const ListElement = (props) => {
    return (
        <LI>{props.children}</LI>
    )
}

export default ListElement;