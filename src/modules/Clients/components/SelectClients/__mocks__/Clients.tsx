import { DetailedHTMLFactory, forwardRef, SelectHTMLAttributes } from "react";
import { ClientComponentProps } from "../types";

interface MockedStatusComponentProps extends ClientComponentProps, DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

const Clients = forwardRef(({ id, clientId, client, onSelectCallback }: MockedStatusComponentProps, ref: React.LegacyRef<HTMLSelectElement>) => {
    return (
        <select defaultValue="choose" data-testid='clients-select-options' onChange={onSelectCallback} ref={ref}>
            <option value="choose" >Wybierz klienta</option>
            <option value="1">Klient 1</option>
            <option value="2">Klient 2</option>
        </select>
    )
})

export { Clients };