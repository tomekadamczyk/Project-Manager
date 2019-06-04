import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 1024px) {
        flex-direction: row;
    }
`;

const ContentTable = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
}

export default ContentTable;