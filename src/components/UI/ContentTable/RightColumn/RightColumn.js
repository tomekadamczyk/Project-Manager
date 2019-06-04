import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    padding: 20px 50px 0 20px;
    border-top: 1px solid #ddd;

    @media (min-width: 1024px) {
        padding-top: 0;
        border-top: none;
        border-left: 1px solid #ddd;
    }
`;

const RightColumn = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
}

export default RightColumn;