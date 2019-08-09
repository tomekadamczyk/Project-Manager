import React from 'react';
import {Query} from 'react-apollo';
import gql from "graphql-tag";
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from '../../components/UI/Form/Select/Select';


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
            if(loading) return <Spinner />;
            if(error) return <p>Nie mogę pobrać statusów</p>;
            
            return(
                <Select update={props.updateStatus} ref={ref}>
                    <option value={props.statusId}>{props.status}</option>
                {data.statuses.map(status => {
                     
                    if(status.id === props.statusId && status.name === props.status) {
                        return null;
                    }
                    else {
                        return <option key={status.id} value={status.id}>{status.name}</option>
                    }
                    
                })}
                </Select>
            )
        }}
    </Query>
    )
}) 
export default Statuses;