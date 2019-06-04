import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 0 20px;
    border-top: 1px solid #ddd;

    @media (min-width: 1024px) {
        border-top: none;
        border-left: 1px solid #ddd;
        transform: translateX(-100px);
        width: 45%;
    }
`;


const CenterColumn = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
}

export default CenterColumn;