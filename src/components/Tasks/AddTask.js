import React, {Component} from 'react';
import {graphql, Query} from 'react-apollo';
import gql from 'graphql-tag';
//import Statuses from '../../Data/Statuses/Statuses';
import TextArea from '../UI/Form/Textarea/Textarea';
import styled from 'styled-components';

const addTaskMutation = gql`
    mutation addTask ($name: String!, $description: String, $statusId: Int!, $priorityId: Int!, $projectId: Int!) {
        addTask(name: $name, description: $description, statusId: $statusId, priorityId: $priorityId, projectId: $projectId){
            name,
            description,
            statusId {
                name
            },
            priorityId {
                name
            },
            projectId
        }
    }
`;


const GET_STATUSES = gql`
query Status {
    statuses {
        id,
        name
    }
}
`;


const GET_PRIORITIES = gql`
query Priorities {
    priorities {
        id,
        name
    }
}
`;

const GET_PROJECTS = gql`
query Projects {
    projects {
        id,
        name
    }
}
`;

const Form = styled.form`
`;


const Input = styled.input`
`;

const Select = styled.select`
`;


class AddTask extends Component {

    submitTask = (e) => {
        e.preventDefault();
        this.props.AddTask({
            variables: {
                name: this.name.value,
                description: this.description.value,
                statusId: Number(this.statusId.value),
                priorityId: Number(this.priorityId.value),
                projectId: Number(this.projectId.value)
            }
        })
        this.props.history.replace('/tasks');
    }



    render() {
        return(
            <>
                <Form>
                    <Input type="text" placeholder="Task name" ref={input => this.name = input}/>
                    <textarea type="text" placeholder="Task description" ref={input => this.description = input}></textarea>
                    <Query query={GET_PROJECTS}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return <p>Pobieram listę statusów...</p>;
                            if(error) return <p>Nie mogę pobrać statusów</p>;
                            
                            return(
                                <>
                                <Select ref={input => this.projectId = input}>
                                {data.projects.map(project => {
                                    return <option key={project.id} value={project.id}>{project.name}</option>
                                })}
                                </Select>
                                </>
                            )
                        }}
                    </Query>
                    <Query query={GET_STATUSES}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return <p>Pobieram listę statusów...</p>;
                            if(error) return <p>Nie mogę pobrać statusów</p>;
                            
                            return(
                                <>
                                <Select ref={input => this.statusId = input}>
                                {data.statuses.map(status => {
                                    return <option key={status.id} value={status.id}>{status.name}</option>
                                })}
                                </Select>
                                </>
                            )
                        }}
                    </Query>
                    <Query query={GET_PRIORITIES}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return <p>Pobieram listę priorytetów...</p>;
                            if(error) return <p>Nie mogę pobrać priorytetów</p>;
                            
                            return(
                                <>
                                <Select ref={input => this.priorityId = input}>
                                {data.priorities.map(priority => {
                                    return <option key={priority.id} value={priority.id}>{priority.name}</option>
                                })}
                                </Select>
                                </>
                            )
                        }}
                    </Query>
                    <button onClick={(e) => this.submitTask(e)}>Assigne new task</button>
                </Form>
            </>
        )
    }
}

export default graphql(addTaskMutation, {
    name: 'AddTask',
    options: {
        refetchQueries: [
            'Tasks'
        ]
    }
})(AddTask);