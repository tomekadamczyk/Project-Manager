import React, { DetailedHTMLFactory, forwardRef, SelectHTMLAttributes } from "react";
import { StatusComponentProps } from "../types";

interface MockedStatusComponentProps extends StatusComponentProps, DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

const Statuses = forwardRef(({ id, statusId, status, onSelectCallback }: MockedStatusComponentProps, ref: React.LegacyRef<HTMLSelectElement>) => {
    return (
        <select data-testid='status-select-options' onChange={onSelectCallback} ref={ref}>
            <option>Wybierz status</option>
            <option value="1">Status 1</option>
            <option value="2">Status 2</option>
        </select>
    )
})

export { Statuses };