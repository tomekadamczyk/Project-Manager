import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    padding: 10px;
    background: #f9f9f9;
    border: 1px solid red;
    margin: 10px 0;
`;

class Validator extends Component {

    render() {
        return (
            <Box>{this.props.information}</Box>
        )
    }
}

export default Validator;