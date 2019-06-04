import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
    padding: 0;
    list-style-type: none;
`;

const UnorderedList = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export default UnorderedList;