import React from 'react';
import {Query} from 'react-apollo';
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from '../../components/UI/Form/Select/Select';
import { GET_CLIENTS } from 'queries/query/getClient'; 
import { useQuery } from '@apollo/client';

export const Clients = React.forwardRef((props, ref) => {

    const { loading, error, data } = useQuery(GET_CLIENTS, {
        variables: {
            id: props.url
        }
    });

    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać klientów</p>;

    return(
        <Select update={props.updateStatus} ref={ref}>
            <option value={props.statusId}>{props.status}</option>
            {data.clients.map(status => {
                
            if(status.id === props.statusId && status.name === props.status) {
                return null;
            }
            else {
                return <option key={status.id} value={status.id}>{status.name}</option>
            }
        })}
        </Select>
    )
}) 