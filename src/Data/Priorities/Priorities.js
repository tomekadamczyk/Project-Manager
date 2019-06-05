import React from 'react';
import {Query} from 'react-apollo';
import gql from "graphql-tag";
import Spinner from '../../components/UI/Spinner/Spinner';



const GET_PRIORITIES = gql`
query Priorities {
    priorities {
        id,
        name
    }
}
`;

const Priorities = React.forwardRef((props, ref) => {
    return (
    <Query query={GET_PRIORITIES} variables={{id: props.url}}>
    {({loading, error, data, refetch}) => {
        if(loading) return <Spinner />;
        if(error) return <p>Nie mogę pobrać priorytetów</p>;
        
        return(
            <select onChange={props.updatePriority} ref={ref}>
                <option value={props.priorityId}>{props.priority}</option>
            {data.priorities.map(priority => {
                return <option key={priority.id} value={priority.id}>{priority.name}</option>
            })}
            </select>
        )
    }}
</Query>
    )
}) 
export default Priorities;