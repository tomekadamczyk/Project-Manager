import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 60%;
    padding-right: 10px;
`;


const LeftColumn = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
}

export default LeftColumn;