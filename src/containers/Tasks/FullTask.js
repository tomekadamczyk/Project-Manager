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
//import Backdrop from '../../components/UI/Backdrop/Backdrop';

// GRAPHQL QUERIES
const updateTaskMutation = gql`
    mutation updateTask($id: Int!, $name: String, $statusId: Int, $priorityId: Int) {
        updateTask(id: $id, name: $name, statusId: $statusId, priorityId: $priorityId) {
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

const GET_TASK = gql`
    query Task ($id: Int!){
        task (id: $id){
            id,
            name,
            statusId {
                id,
                name
            },
            priorityId {
                id,
                name
            },
            projectsId {,
                id,
                name
            }
        }
    }
`;

// STYLED COMPONENTS
const Select = styled.select`
`;

const Form = styled.form`
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

const CloseButton = styled.button`
    border: none;
    background: f1f1f1;
    color: #00f;
    font-size: 30px;
    cursor: pointer;
    transition-duration: .3s;
    position: absolute;
    right: 20px;

    &:hover {
        background: #dad;
        color: #fff;
    }
`;



class FullTask extends Component {
    constructor(props) {
        super(props);

        this.statusId = React.createRef();
        this.priorityId = React.createRef();
    }

    updateProject = () => {
        this.props.UpdateTask({
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
        alert('You updated status successfully')
    }

    updatePriority = () => {
        this.updateProject();
        alert('You updated priority successfully')
    }

    updateName = () => {
        this.updateProject();
        alert('You updated name successfully')
    }
    
    closeProjectModal = () => {
        this.props.history.goBack();
    }

    render() {
        
    const FullTaskData = (props) => {    
        // if(!this.state.backdropInVisible) {
        //     wrapper = 
        //     <>
        //     {wrapper}
        //     <Backdrop onClick={this.hideBackdrop}/>
        //     </>
        // }
        return(
            <ContentTable>
                <LeftColumn>
                    <h2>Project name</h2>
                    <Input onBlur={this.updateName} type="text" placeholder={props.name} defaultValue={props.name} ref={input => this.name = input}/>
                </LeftColumn>
                <CenterColumn>
                    <h2>List of tasks</h2>
                    <div>
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
            <Query query={GET_TASK} variables={{id: Number(this.props.match.params.id)}}>
                {({loading, error, data, refetch} ) => {
                    if(loading) return <Spinner />;
                    if(error) return <p>Nie mogę pobrać listy zadań</p>;
                    
                    
                    return(
                        <FullTaskData 
                        key={data.task.id}
                        id={data.task.id} 
                        name={data.task.name}
                        status={data.task.statusId.name}
                        statusId={data.task.statusId.id}
                        priority={data.task.priorityId.name}
                        priorityId={data.task.priorityId.id}
                        url={Number(this.props.match.params.id)}
                        updateStatus={this.updateStatus}
                        updatePriority={this.updatePriority}
                        />
                    )
                }}
            </Query>
        )
    }
}


export default graphql(updateTaskMutation, {
    name: 'UpdateTask',
    options: {
        refetchQueries: [
            'Task', 'Tasks', 'Projects'
        ]
    }
})(FullTask);