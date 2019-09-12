import React from 'react';
import styled from 'styled-components';

const Head = styled.header`
    padding: 10px;
    background: #f9f9f9;
    width: calc(100% - 65px);
    position: relative;
    left: 65px;
    max-height: 63px;
    height: 43px;
`;

const Header = (props) => {
    return (
        <Head></Head>
    )
}

export default Header;