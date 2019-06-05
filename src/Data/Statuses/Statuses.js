import React from 'react';
import {Query} from 'react-apollo';
import gql from "graphql-tag";


const GET_STATUSES = gql`
query Status {
    statuses {
        id,
        name
    }
}
`;

const Statuses = React.forwardRef((props, ref) => {
    return (

        <Query query={GET_STATUSES} variables={{id: props.url}}>
        {({loading, error, data, refetch}) => {
            if(loading) return <p>Pobieram listę statusów...</p>;
            if(error) return <p>Nie mogę pobrać statusów</p>;
            
            return(
                <select onChange={props.updateStatus} ref={ref}>
                    <option value={props.statusId}>{props.status}</option>
                {data.statuses.map(status => {
                    return <option key={status.id} value={status.id}>{status.name}</option>
                })}
                </select>
            )
        }}
    </Query>
    )
}) 
export default Statuses;