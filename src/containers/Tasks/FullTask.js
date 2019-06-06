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
import InfoBox from '../../components/InfoBox/InfoBox';
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

class FullTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateInfo: null,
            taskName: this.props.name
        }

        this.statusId = React.createRef();
        this.priorityId = React.createRef();
        this.updateInformation = null;
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
        this.updateInformation = 'Status';
        this.setState({updateInfo: this.updateInformation});
    }

    updatePriority = () => {
        this.updateProject();
        this.updateInformation = 'Priority';
        this.setState({updateInfo: this.updateInformation});
    }

    updateName = () => { 
        this.updateProject();
        this.updateInformation = 'Task name';
        this.setState({updateInfo: this.updateInformation, taskName: this.name.value});
    }

    render() {   
        
    const FullTaskData = (props) => {    
        return(
            <ContentTable>
                {this.updateInformation ? <InfoBox info={this.updateInformation}></InfoBox> : null}
                <LeftColumn>
                    <h2>Task</h2>
                    <Input onBlur={props.updateName} type="text" placeholder={props.name} defaultValue={this.state.taskName} ref={input => this.name = input}/>
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
                        updateName={this.updateName}
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
            'Task'
        ]
    }
})(FullTask);
