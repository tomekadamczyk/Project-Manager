import React, { DragEvent } from 'react';
import KanbanCard from './KanbanCard/KanbanCard';
import styled from 'styled-components';
import { UPADTE_TASK } from 'queries/mutation/updateTask';
import { useMutation } from '@apollo/client';

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

function dragover_handler(ev: DragEvent<HTMLDivElement>)  {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}

interface Status {
    id: number;
    name: string;
    tasks: any[];
}

export function KanbanColumn({ id, name, tasks}: Status) {
    let taskId = null;
    // drop_handler = (ev) => {
    //     ev.preventDefault();
    //     ev.stopPropagation();
    //     // Get the id of the target and add the moved element to the target's DOM
    //     var data = ev.dataTransfer.getData("text/plain");
    //     ev.target.appendChild(document.getElementById(data));
    //     taskId = data;
    //     this.updateTask();
    // }
    const [updateTask, { data, loading, error }] = useMutation(UPADTE_TASK);

    function dropHandler(ev: DragEvent<HTMLDivElement>) {    
        ev.preventDefault();
        ev.stopPropagation();
        // Get the id of the target and add the moved element to the target's DOM
        var data = ev.dataTransfer.getData("text/plain");
        (ev.target as HTMLDivElement).appendChild((document.getElementById(data) as HTMLElement));
        taskId = data;
        updateTask({ variables: {
            id: Number(taskId),
            statusId: Number(id)
        } });
    }

    return (
        <Column 
            onDrop={dropHandler}
            onDragOver={(ev: DragEvent<HTMLDivElement>) => dragover_handler(ev)}
        >
        <Label>{name}</Label>
        {tasks.map(task => {
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
    )
}