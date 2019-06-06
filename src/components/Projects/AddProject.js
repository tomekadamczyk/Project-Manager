import React, {Component} from 'react';
import {graphql, Query} from 'react-apollo';
import gql from 'graphql-tag';
//import Statuses from '../../Data/Statuses/Statuses';
import TextArea from '../UI/Form/Textarea/Textarea';
import styled from 'styled-components';

const addProjectMutation = gql`
    mutation addProject ($name: String!, $description: String, $statusId: Int!, $priorityId: Int!, $clientId: Int!) {
        addProject(name: $name, description: $description, statusId: $statusId, priorityId: $priorityId, clientId: $clientId){
            name,
            description,
            statusId {
                name
            },
            priorityId {
                name
            },
            clientId {
                name
            }
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


const GET_CLIENTS = gql`
query Clients {
    clients {
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


class AddProject extends Component {

    submitProject = (e) => {
        e.preventDefault();
        this.props.AddProject({
            variables: {
                name: this.name.value,
                description: this.description.value,
                statusId: Number(this.statusId.value),
                priorityId: Number(this.priorityId.value),
                clientId: Number(this.clientId.value)
            }
        })
        this.props.history.goBack();
    }



    render() {
        return(
            <>
                <Form>
                    <Input type="text" placeholder="Project name" ref={input => this.name = input}/>
                    <textarea type="text" placeholder="Project description" ref={input => this.description = input}></textarea>
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
                    <Query query={GET_CLIENTS}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return <p>Pobieram listę klientów...</p>;
                            if(error) return <p>Nie mogę pobrać klientów</p>;
                            
                            return(
                                <>
                                <Select ref={input => this.clientId = input}>
                                {data.clients.map(client => {
                                    return <option key={client.id} value={client.id}>{client.name}</option>
                                })}
                                </Select>
                                </>
                            )
                        }}
                    </Query>
                    <button onClick={(e) => this.submitProject(e)}>Create new project</button>
                </Form>
            </>
        )
    }
}

export default graphql(addProjectMutation, {
    name: 'AddProject',
    options: {
        refetchQueries: [
            'Projects'
        ]
    }
})(AddProject);