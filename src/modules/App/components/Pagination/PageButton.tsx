
import styled from "styled-components";

export const PageButtonStyle = styled.button`
    border-color: ${({isActive}: { isActive: boolean}) => isActive ? 'blue' : 'transparent'};
    background-color: #fff;
    padding: 3px 14px;
    cursor: pointer;

    &:hover:not([disabled]) {
        ${({isActive}: { isActive: boolean}) => !isActive ? 'background-color: #0099ff; color: #fff;' : undefined};
    }

    &:disabled {
        color: #ccc;
        cursor: initial;
    }
`;

export function PageButton({ count, onClick, isActive } : { count: number, onClick: () => void, isActive: boolean; }) {
    return (
        <PageButtonStyle isActive={isActive} onClick={onClick}>{count}</PageButtonStyle>
    )
}