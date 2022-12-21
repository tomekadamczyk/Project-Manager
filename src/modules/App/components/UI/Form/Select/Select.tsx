import React, { ChangeEvent, ChangeEventHandler, DetailedHTMLFactory, ForwardedRef, ReactNode, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

const Area = styled.select`
    margin-right: 15px;
    padding: 6px 10px;

    background-color: white;
    border: thin solid blue;
    border-radius: 4px;
    display: inline-block;
    line-height: 1.5em;
    width: 100%;

    -webkit-appearance: none;
    -moz-appearance: none;

    // background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
    // background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
    // background-size: 5px 5px, 5px 5px, 1px 1.5em;
    // background-repeat: no-repeat;

    // &:focus {
    //     background-image: linear-gradient(45deg, green 50%, transparent 50%), linear-gradient(135deg, transparent 50%, green 50%), linear-gradient(to right, #ccc, #ccc);
    //     background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, calc(100% - 2.5em) 0.5em;
    //     background-size: 5px 5px, 5px 5px, 1px 1.5em;
    //     background-repeat: no-repeat;
    //     border-color: green;
    //     outline: 0;
    // }
`;

interface SelectProps extends DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    update: (arg: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
    children: ReactNode;
    ref: ForwardedRef<unknown>
    testid: string;
    defaultValue?: string;
    value?: string;
    name?: string;
}

const Select = React.forwardRef(({ update, children, testid, defaultValue, value, name, ...props }: SelectProps, ref) => {
    return(
        <Area {...props} value={value} data-testid={testid} name={name} onChange={update} ref={ref}>{children}</Area>
    )
})

export default Select;