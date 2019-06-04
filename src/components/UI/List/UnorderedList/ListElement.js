import React from 'react';
import styled from 'styled-components';

const LI = styled.li`

`;

const ListElement = (props) => {
    return (
        <LI>{props.children}</LI>
    )
}

export default ListElement;