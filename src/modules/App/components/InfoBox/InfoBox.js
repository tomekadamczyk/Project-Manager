import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    position: fixed;
    right: 270px;
    background: #009900;
    color: #fff;
    padding: 20px 35px;
    font-weight: 600;
    animation: goDown 2.4s ease-out;
    opacity: 0;


    @keyframes goDown {
        0% {transform: translateY(0); opacity: 1;}
        35% {transform: translateY(0); opacity: 1;}
        100% {transform: translateY(300px); opacity: 0;}
    }

`;

const InfoBox = (props) => {
    return (
        <Box>
            {props.info} updated
        </Box>
    )
}

export default InfoBox;