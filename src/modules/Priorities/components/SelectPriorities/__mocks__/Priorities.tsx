import React, { DetailedHTMLFactory, forwardRef, SelectHTMLAttributes } from "react";
import { PriorityComponentProps } from "../types";

interface MockedStatusComponentProps extends PriorityComponentProps, DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

const Priorities = forwardRef(({ id, priorityId, priority, onSelectCallback }: MockedStatusComponentProps, ref: React.LegacyRef<HTMLSelectElement>) => {
    return (
        <select data-testid='priority-select-options' onChange={onSelectCallback} ref={ref}>
            <option>Wybierz priorytet</option>
            <option value="1">Priorytet 1</option>
            <option value="2">Priorytet 2</option>
        </select>
    )
})

export { Priorities };