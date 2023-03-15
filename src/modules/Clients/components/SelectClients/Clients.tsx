import React from 'react';
import Spinner from 'modules/App/components/UI/Spinner/Spinner';
import Select from 'modules/App/components/UI/Form/Select/Select';
import { GET_CLIENTS } from 'queries/query/getClient'; 
import { useQuery } from '@apollo/client';
import { ClientComponentProps, ClientsData } from './types';

export const Clients = React.forwardRef(({ id, clientId, client, onSelectCallback }: ClientComponentProps, ref) => {

    const { loading, error, data } = useQuery<ClientsData>(GET_CLIENTS);

    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać klientów</p>;
    if(!data) return <p>Brak klientów</p>;

    return(
        <Select testid="clients-select-options" update={onSelectCallback} ref={ref}>
            {client ? <option value={clientId}>{client}</option> : <option value="choose">Wybierz klienta</option>}
            {data.clients.map(clientItem => {
                
            if(clientItem.id === clientId && clientItem.name === client) {
                return null;
            }
            else {
                return <option key={clientItem.id} value={clientItem.id}>{clientItem.name}</option>
            }
        })}
        </Select>
    )
}) 