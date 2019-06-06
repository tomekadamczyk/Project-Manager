import React, { Component } from 'react';
import {graphql, Query} from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';
import Spinner from '../../components/UI/Spinner/Spinner';
import Statuses from '../../Data/Statuses/Statuses';
import Priorities from '../../Data/Priorities/Priorities';
import ContentTable from '../../components/UI/ContentTable/ContentTable';
import LeftColumn from '../../components/UI/ContentTable/LeftColumn/LeftColumn';
import CenterColumn from '../../components/UI/ContentTable/CenterColumn/CenterColumn';
import RightColumn from '../../components/UI/ContentTable/RightColumn/RightColumn';
import UnorderedList from '../../components/UI/List/UnorderedList/UnorderedList';
import ListElement from '../../components/UI/List/UnorderedList/ListElement';
import InfoBox from '../../components/InfoBox/InfoBox';
import {NavLink} from 'react-router-dom';
//import Backdrop from '../../components/UI/Backdrop/Backdrop';

// GRAPHQL QUERIES
const updateProjectMutation = gql`
    mutation updateProject($id: Int!, $name: String, $statusId: Int, $priorityId: Int) {
        updateProject(id: $id, name: $name, statusId: $statusId, priorityId: $priorityId) {
            name,
            statusId {
                name
            },
            priorityId {
                name
            }
        }
    }
`;

const GET_PROJECT = gql`
    query Project ($id: Int!){
        project (id: $id){
            id,
            name,
            tasks {
                id,
                name
            },
            statusId {
                id,
                name
            },
            priorityId {
                id,
                name
            },
            clientId {
                name
            }
        }
    }
`;

const Input = styled.input`
    border: none;
    color: #000;
    font-size: 20px;
    padding: 7px 10px;

    &:focus {
        border: 1px solid #ccc;
        background: #f9f9f9;
        color: #000;
    }
`;

class FullProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateInfo: null,
            projectName: this.props.name
        }

        this.statusId = React.createRef();
        this.priorityId = React.createRef();
        this.updateInformation = null;
    }

    updateProject = () => {
        this.props.UpdateProject({
            variables: {
                id: Number(this.props.match.params.id),
                name: this.name.value,
                statusId: Number(this.statusId.value),
                priorityId: Number(this.priorityId.value)
            }
        })
    }

    updateStatus = () => {
        this.updateProject();
        this.updateInformation = 'Status';
        this.setState({updateInfo: this.updateInformation});
    }

    updatePriority = () => {
        this.updateProject();
        this.updateInformation = 'Priority';
        this.setState({updateInfo: this.updateInformation});
    }

    updateName = () => { 
        if(this.name.value) {
            this.updateProject();
            this.updateInformation = 'Task name';
            this.setState({updateInfo: this.updateInformation, projectName: this.name.value});
        }
    }
    
    closeProjectModal = () => {
        this.props.history.goBack();
    }

    goToTask(id) {
        this.props.history.replace('/tasks/' + id)
    }

    render() {
        
    const FullProjectData = (props) => { 

        return(
            <ContentTable>
            {this.updateInformation ? <InfoBox info={this.updateInformation}></InfoBox> : null}
                <LeftColumn>
                    <h2>Project name</h2>
                    <Input onBlur={props.updateName} type="text" placeholder={props.name} defaultValue={this.state.taskName} ref={input => this.name = input}/>
                </LeftColumn>
                <CenterColumn>
                    <h2>List of tasks</h2>
                    <div>
                        <UnorderedList>
                            {props.tasks}
                        </UnorderedList>
                    </div>
                </CenterColumn>
                <RightColumn>

                    <h3>Status</h3>
                    <Statuses updateStatus={props.updateStatus} statusId={props.statusId} status={props.status} ref={input => this.statusId = input}/>

                    <h3>Priority</h3>
                    <Priorities updatePriority={props.updatePriority} priorityId={props.priorityId} priority={props.priority} ref={input => this.priorityId = input}/>

                    <h3>Client</h3>
                    <p>{props.client}</p>
                </RightColumn>
            </ContentTable>
        )
    }
        return (
            <Query query={GET_PROJECT} variables={{id: Number(this.props.match.params.id)}}>
                {({loading, error, data, refetch} ) => {
                    if(loading) return <Spinner />;
                    if(error) return <p>Nie mogę pobrać projektu</p>;
                    const tasks = data.project.tasks.map((task, index) => {
                        return <NavLink key={index} to={`/tasks/${task.id}`}>
                                <ListElement id={task.id}>{index + 1}. {task.name}</ListElement>
                            </NavLink>;
                    })
                    return(
                        <FullProjectData 
                        key={data.project.id}
                        id={data.project.id} 
                        name={data.project.name}
                        tasks={tasks}
                        status={data.project.statusId.name}
                        statusId={data.project.statusId.id}
                        priority={data.project.priorityId.name}
                        priorityId={data.project.priorityId.id}
                        client={data.project.clientId.name} 
                        url={Number(this.props.match.params.id)}
                        updateStatus={this.updateStatus}
                        updatePriority={this.updatePriority}
                        updateName={this.updateName}
                        />
                    )
                }}
            </Query>
        )
    }
}


export default graphql(updateProjectMutation, {
    name: 'UpdateProject',
    options: {
        refetchQueries: [
            'Project'
        ]
    }
})(FullProject);
