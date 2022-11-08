import React from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from '../../components/UI/Form/Select/Select';
import { GET_PRIORITIES } from 'queries/query/getPriorities';
import { useQuery } from '@apollo/client';
import { PrioritiesData, PriorityComponentProps } from './types'

export const Priorities = React.forwardRef(({ id, priorityId, priority, onSelectCallback }: PriorityComponentProps, ref) => {
    const { loading, error, data } = useQuery<PrioritiesData>(GET_PRIORITIES);

    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać priorytetów</p>;
    if(!data) return <p>Brak priorytetów do wyświetlenia</p>;

    return(
        <Select defaultValue={priorityId ? priorityId.toString() : 'choose'} testid='priorities-select-options' update={onSelectCallback} ref={ref}>
            {priority ? <option value={priorityId}>{priority}</option> : <option>Wybierz priorytet</option>}
            {data.priorities.map(priority => {
                if(priority.id === priorityId) {
                    return null;
                }
                else {
                    return <option key={priority.id} value={priority.id}>{priority.name}</option>
                }
            })}
        </Select>
    )
}) 