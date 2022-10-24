import React, { Component } from 'react';
import {graphql, Query} from 'react-apollo';
import gql from "graphql-tag";
import Spinner from '../../components/UI/Spinner/Spinner';
import { Statuses } from '../../Data/Statuses/Statuses';
import { Priorities } from '../../Data/Priorities/Priorities';
import ContentTable from '../../components/UI/ContentTable/ContentTable';
import LeftColumn from '../../components/UI/ContentTable/LeftColumn/LeftColumn';
import CenterColumn from '../../components/UI/ContentTable/CenterColumn/CenterColumn';
import RightColumn from '../../components/UI/ContentTable/RightColumn/RightColumn';
import InfoBox from '../../components/InfoBox/InfoBox';
import TextArea from '../../components/UI/Form/Textarea/Textarea';
import Input from '../../components/UI/Form/Input/Input';
import { UPDATE_FULL_TASK } from 'queries/mutation/updateTask';
import { GET_TASK_BY_ID } from 'queries/query/getTasks';
//import Backdrop from '../../components/UI/Backdrop/Backdrop';

class FullTask extends Component {
    constructor(props) {
        super(props);
        this.statusId = React.createRef();
        this.priorityId = React.createRef();
        this.description = React.createRef();
        this.name = React.createRef();
        this.updateInformation = null;
        this.state = {
            isFirstRender: true
        }
    }

    updateTask = () => {
        this.props.UpdateTask({
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
        this.updateTask();
        this.updateInformation = 'Status';
        this.setState({status: this.statusId.value});
    }

    updatePriority = () => {
        this.updateTask();
        this.updateInformation = 'Priority';
        this.setState({priority: this.priorityId.value});
    }

    updateName = (e) => { 
        if(e.target.value !== this.state.name) {
            this.updateTask();
            this.updateInformation = 'Task name';
            this.setState({name: this.name.value});
        }
    }

    updateDescription = (e) => { 
        if(e.target.value !== this.state.description) {
            this.updateTask();
            this.updateInformation = 'Description';
            this.setState({description: this.description.value});
        }
    }

    
    setData = (name, description, status, priority) => {
        if (this.state.isFirstRender){
            this.setState({name, description, status, priority, isFirstRender: false})
        }
    }

    componentWillUnmount() {
        this.setState({isFirstRender: true})
    }
    

    render() {   
        
        const FullTaskData = (props) => {    
            return(
                <ContentTable>
                    {this.updateInformation ? <InfoBox updateTask={props.updateTask} info={this.updateInformation}></InfoBox> : null}

                    <LeftColumn>
                        <h2>Task</h2>
                        <Input 
                        blur={(e) => props.updateName(e)} 
                        type="text" 
                        placeholder={props.name} 
                        defaultValue={this.state.name ? this.state.name : props.name} 
                        ref={input => this.name = input}/>

                        <TextArea 
                        updateDescription={(e) => props.updateDescription(e)} 
                        type="text" 
                        placeholder={props.description} 
                        defaultValue={this.state.description ? this.state.description : props.description} 
                        ref={input => this.description = input}></TextArea>
                    </LeftColumn>

                    <CenterColumn>
                        <h2>List of tasks</h2>
                    </CenterColumn>

                    <RightColumn>
                        <h3>Status</h3>
                        <Statuses 
                        updateStatus={props.updateStatus} 
                        statusId={props.statusId} 
                        status={props.status} 
                        ref={input => this.statusId = input}/>

                        <h3>Priority</h3>
                        <Priorities 
                        updatePriority={props.updatePriority} 
                        priorityId={props.priorityId} 
                        priority={props.priority} 
                        ref={input => this.priorityId = input}/>

                        <h3>Client</h3>
                        <p>{props.client}</p>
                    </RightColumn>
                    
                </ContentTable>
            )
        }
        return (
            <Query 
                query={GET_TASK_BY_ID} 
                variables={{id: Number(this.props.match.params.id)}} 
                onCompleted={data => this.setData(data.task.name, data.task.description, data.task.statusId.name, data.task.priorityId.name)}>
                {({loading, error, data, refetch} ) => {
                    if(loading) return <Spinner />;
                    if(error) return <p>Nie mogę pobrać listy zadań</p>;
                    
                    return(
                        <FullTaskData 
                        key={data.task.id}
                        id={data.task.id} 
                        name={data.task.name}
                        description={data.task.description}
                        status={data.task.statusId.name}
                        statusId={data.task.statusId.id}
                        priority={data.task.priorityId.name}
                        priorityId={data.task.priorityId.id}
                        url={Number(this.props.match.params.id)}
                        updateStatus={this.updateStatus}
                        updatePriority={this.updatePriority}
                        updateName={this.updateName}
                        updateDescription={this.updateDescription}
                        updateTask={this.updateTask}
                        />
                    )
                }}
            </Query>
        )
    }
}

export default graphql(UPDATE_FULL_TASK, {
    name: 'UpdateTask',
    options: {
        refetchQueries: [
            'Task'
        ]
    }
})(FullTask);
