import React from 'react';
import KanbanCard from './KanbanCard/KanbanCard';
import styled from 'styled-components';

const Column = styled.div`
    border: 1px solid #ddd;
    background: #f1f1f1;
    border-radius: 5px;
    width: 220px;
    padding: 10px;
`;

const Label = styled.div`
    background: #000099;
    color: #fff;
    padding: 5px 0;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
`;

const KanbanColumn = (props) => {

    return (
        <>
        <Column>
        <Label>{props.name}</Label>
        {props.tasks.map(task => {
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
        </>
    )

}

export default KanbanColumn;