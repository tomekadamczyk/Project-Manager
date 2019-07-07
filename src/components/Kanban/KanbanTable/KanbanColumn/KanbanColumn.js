import React, {Component} from 'react';
import KanbanCard from './KanbanCard/KanbanCard';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {withApollo, Mutation} from 'react-apollo';

const updateTaskMutation = gql`
    mutation updateTask($id: Int!, $statusId: Int) {
        updateTask(id: $id, statusId: $statusId) {
            statusId {
                id,
                name
            }
        }
    }
`;


// const GET_STATUSES = gql`
//     query Status {
//         statuses {
//             id,
//             name,
//             tasks {
//                 id,
//                 name,
//                 priorityId {
//                     id,
//                     name
//                 },
//                 projectsId {
//                     id,
//                     name
//                 }
//             }
//         }
//     }
// `;

// const updateTask = () => {
//     let id,
//     status;

//     return <Mutation mutation={updateTaskMutation}>
//         {(updateTask, {data}) => {

//         }}
//     </Mutation>
// }


const Column = styled.div`
    border: 1px solid #f9f9f9;
    background: #f1f1f1;
    border-radius: 3px;
    width: calc((100% / 7) - 25px);
    padding: 5px;
`;

const Label = styled.div`
    background: #fff;
    color: #000099;
    padding: 5px 0;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
`;

class KanbanColumn extends Component {
    constructor(props) {
        super(props)
        this.taskId = null;
    }

    // updateTask = (UpdateTask) => {
    //     UpdateTask({
    //         variables: {
    //             id: Number(this.taskId),
    //             statusId: Number(this.props.id)
    //         }
    //     })
    // }
    
    dragover_handler = (ev) => {
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "move"
    }

    // drop_handler = (ev) => {
    //     ev.preventDefault();
    //     ev.stopPropagation();
    //     // Get the id of the target and add the moved element to the target's DOM
    //     var data = ev.dataTransfer.getData("text/plain");
    //     ev.target.appendChild(document.getElementById(data));
    //     this.taskId = data;
    //     this.updateTask();
    // }

    componentDidMount() {
        // console.log(this.props)
        // console.log(this.props.client.cache.data.data.ROOT_QUERY.statuses)
    }

    render() {
        return (
            <Mutation mutation={updateTaskMutation}>  
                {(updateTask, {data}) => (

                    <Column onDrop={(ev) => {    
                                ev.preventDefault();
                                ev.stopPropagation();
                                // Get the id of the target and add the moved element to the target's DOM
                                var data = ev.dataTransfer.getData("text/plain");
                                ev.target.appendChild(document.getElementById(data));
                                this.taskId = data;
                                updateTask({ variables: {
                                    id: Number(this.taskId),
                                    statusId: Number(this.props.id)
                                } });
                            }}
                    onDragOver={(ev) => this.dragover_handler(ev)}>
                    <Label>{this.props.name}</Label>
                    {this.props.tasks.map(task => {
                        return <KanbanCard 
                        key={task.id} 
                        id={task.id}
                        name={task.name} 
                        priority={task.priorityId.name} 
                        description={task.description} 
                        project={task.projectsId.name} 
                        projectId={task.projectsId.id}/>
                    })}
                    </Column>
                )}
            </Mutation>
        )
    }


}

export default withApollo(KanbanColumn);