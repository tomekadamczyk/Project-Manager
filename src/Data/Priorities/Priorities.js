import React from 'react';
import {Query} from 'react-apollo';
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from '../../components/UI/Form/Select/Select';
import { GET_PRIORITIES } from 'queries/query/getPriorities';
import { useQuery } from '@apollo/client';

export const Priorities = React.forwardRef((props, ref) => {

    const { loading, error, data } = useQuery(GET_PRIORITIES, {
        variables: {
            id: props.url
        }
    });

    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać priorytetów</p>;

    return(
        <Select update={props.updatePriority} ref={ref}>
            <option value={props.priorityId}>{props.priority}</option>
            {data.priorities.map(priority => {
                if(priority.id === props.priorityId && priority.name === props.priority) {
                    return null;
                }
                else {
                    return <option key={priority.id} value={priority.id}>{priority.name}</option>
                }
            })}
        </Select>
    )
}) 