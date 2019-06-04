import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
`;


const LeftColumn = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
}

export default LeftColumn;