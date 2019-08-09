import React from 'react';
import {Query} from 'react-apollo';
import gql from "graphql-tag";
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from '../../components/UI/Form/Select/Select';


const GET_TASKS = gql`
    query Tasks {
        tasks {
            id,
            name
        }
    }
`;

const Tasks = React.forwardRef((props, ref) => {
    return (

        <Query query={GET_TASKS}>
            {({loading, error, data, refetch}) => {
                if(loading) return <Spinner />;
                if(error) return <p>Nie mogę pobrać zadań</p>;

                return(
                    <Select ref={ref}>
                    {data.tasks.map(task => {
                        return <option key={task.id} value={task.id}>{task.name}</option>
                        
                    })}
                    </Select>
                )
            }}
        </Query>
    )
}) 
export default Tasks;