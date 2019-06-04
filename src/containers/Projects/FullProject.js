import React, { Component } from 'react';
import {graphql, Query} from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import Statuses from './Statuses';
import Priorities from './Priorities';
//import Backdrop from '../../components/UI/Backdrop/Backdrop';

// GRAPHQL QUERIES
const updateProjectMutation = gql`
    mutation updateProject($id: Int!, $name: String, $statusId: Int, $priorityId: Int) {
        updateProject(id: $id, name: $name, statusId: $statusId, priorityId: $priorityId) {
            name,
            statusId {
                id
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

const RightColumn = styled.div`
    margin-top: 70px;
    padding: 20px 20px 0;
    border-top: 1px solid #ddd;

    @media (min-width: 1024px) {
        padding-top: 0;
        border-top: none;
        border-left: 1px solid #ddd;
    }
`;

const CenterColumn = styled.div`
    padding: 0 20px;
    border-top: 1px solid #ddd;

    @media (min-width: 1024px) {
        border-top: none;
        border-left: 1px solid #ddd;
        transform: translateX(-100px);
    }
`;

const Leftcolumn = styled.div`
    padding: 20px;
`;

class FullProject extends Component {
    constructor(props) {
        super(props);

        this.statusId = React.createRef();
        this.priorityId = React.createRef();
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
        alert('You updated status successfully')
    }

    updatePriority = () => {
        this.updateProject();
        alert('You updated priority successfully')
    }

    updateName = () => {
        alert('You updated name successfully')
    }
    
    closeProjectModal = () => {
        this.props.history.goBack();
    }

    render() {
        
    const FullProjectData = (props) => {    
        // if(!this.state.backdropInVisible) {
        //     wrapper = 
        //     <>
        //     {wrapper}
        //     <Backdrop onClick={this.hideBackdrop}/>
        //     </>
        // }
        return(
            <>
                <CloseButton onClick={this.closeProjectModal}>X</CloseButton>
                <Leftcolumn>
                    <div>
                        <h2>Project name</h2>
                        <Input onBlur={this.updateName} type="text" placeholder={props.name} defaultValue={props.name} ref={input => this.name = input}/>
                    </div>
                </Leftcolumn>
                <CenterColumn>
                    <h2>List of tasks</h2>
                    <div>
                        <ul>
                            <li>{props.tasks}</li>
                        </ul>
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
            </>
        )
    }
        return (
            <Query query={GET_PROJECT} variables={{id: Number(this.props.match.params.id)}}>
                {({loading, error, data, refetch} ) => {
                    if(loading) return <Spinner />;
                    if(error) return <p>Nie mogę pobrać projektu</p>;
                    return(
                        <FullProjectData 
                        key={data.project.id}
                        id={data.project.id} 
                        name={data.project.name}
                        tasks={data.project.tasks.name}
                        status={data.project.statusId.name}
                        statusId={data.project.statusId.id}
                        priority={data.project.priorityId.name}
                        priorityId={data.project.priorityId.id}
                        client={data.project.clientId.name} 
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


export default graphql(updateProjectMutation, {
    name: 'UpdateProject',
    options: {
        refetchQueries: [
            'Projects'
        ]
    }
})(FullProject);
