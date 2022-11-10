import styled from 'styled-components';

const Element = styled.button`
    border: transparent;
    border-radius: 20px;
    padding: 10px 20px;
    color: #fff;
    background: #0000cc;
    transition: background .3s;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background: #339933;
    }

    &.loading {
        background: #fa4;
    }

    &:disabled {
        background: #fff;
    }
`;

const Button = (props) => {
    return (
        <Element {...props} onClick={props.click}>{props.children}</Element>
    )
}

export default Button;