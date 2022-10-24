import React from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from '../../components/UI/Form/Select/Select';
import { GET_STATUSES } from 'queries/query/getStatuses';
import { useQuery } from '@apollo/client';
import { StatusesData, StatusesVariables, StatusComponentProps } from './types';

export const Statuses = React.forwardRef(({ id, statusId, status, onSelectCallback }: StatusComponentProps, ref) => {

    const { loading, error, data } = useQuery<StatusesData, StatusesVariables>(GET_STATUSES);

    if(loading) return <Spinner />;
    if(error || !data) return <p>Nie mogę pobrać statusów</p>;

    return(
        <Select testid='statuses-select-options' update={onSelectCallback} ref={ref}>
            {status ? <option value={statusId}>{status}</option> : <option>Wybierz status</option>}
            {data.statuses ? data.statuses.map(item => {
                if(item.id === statusId) {
                    return null;
                }
                else {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                }
                
            }) : null}
        </Select>
    )
}) 