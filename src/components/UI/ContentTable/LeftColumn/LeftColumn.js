import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 20px;
`;


const LeftColumn = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
}

export default LeftColumn;