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
import TextArea from '../../components/UI/Form/Textarea/Textarea';
//import Backdrop from '../../components/UI/Backdrop/Backdrop';

// GRAPHQL QUERIES
const updateProjectMutation = gql`
    mutation updateProject($id: Int!, $name: String, $description: String, $statusId: Int, $priorityId: Int) {
        updateProject(id: $id, name: $name, description: $description, statusId: $statusId, priorityId: $priorityId) {
            name,
            description,
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
            description,
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
    display: block;

    &:focus {
        border: 1px solid #ccc;
        background: #f9f9f9;
        color: #000;
    }
`;

const RoundButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ff9900;
    border: none;
    margin-top: 30px;
    transition: background .3s ease-in-out .5s;

    &:hover {
        background: #0099ff;
    }
`;


class FullProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateInfo: null
        }

        this.statusId = React.createRef();
        this.priorityId = React.createRef();
        this.description = React.createRef();
        this.updateInformation = null;
    }

    updateProject = () => {
        this.props.UpdateProject({
            variables: {
                id: Number(this.props.match.params.id),
                name: this.name.value,
                description: this.description.value,
                statusId: Number(this.statusId.value),
                priorityId: Number(this.priorityId.value)
            }
        })
    }

    updateStatus = () => {
        this.updateInformation = 'Status';
        this.updateProject();
        this.setState({updateInfo: this.updateInformation});
    }

    updatePriority = () => {
        this.updateInformation = 'Priority';
        this.updateProject();
        this.setState({updateInfo: this.updateInformation});
    }

    updateName = () => { 
        if(this.name.value) {
            this.updateInformation = 'Task name';
            this.updateProject();
        }
    }

    updateDescription = () => { 
        if(this.description.value) {
            this.updateInformation = 'Description';
            this.updateProject();
        }
    }
    
    closeProjectModal = () => {
        this.props.history.goBack();
    }

    render() {
        
    const FullProjectData = (props) => { 

        return(
            <ContentTable>
            {this.updateInformation ? <InfoBox info={this.updateInformation}></InfoBox> : null}
                <LeftColumn>
                    <h2>Project name</h2>
                    <Input onBlur={props.updateName} type="text" placeholder={props.name} defaultValue={props.name} ref={input => this.name = input}/>
                    <TextArea updateDescription={props.updateDescription} type="text" placeholder={props.description} defaultValue={props.description} ref={input => this.description = input}></TextArea>
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
                        description={data.project.description}
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
                        createTask={this.createTask}
                        updateDescription={this.updateDescription}
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
            'Project', 'Projects'
        ]
    }
})(FullProject);
