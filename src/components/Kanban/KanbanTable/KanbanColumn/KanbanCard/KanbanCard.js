import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Card = styled.div`
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 5px;
    height: 100px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 1px 1px 6px 1px #ccc;
    position: relative;

    &:last-child {
        margin-bottom: 0;
    }
`;

const Label = styled.div`
    border-radius: 5px;
    background: #fa4;
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

const Label1 = styled(NavLink)`
    border-radius: 5px;
    background: green;
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        background: blue;
    }
`;

const Name = styled(NavLink)`
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: underline;
        color: blue;
    }
`;


const dragstart_handler = (ev) => {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
   }

const KanbanCard = (props) => {
    
    return (
        <Card id={props.id} draggable onDragStart={(ev) => dragstart_handler(ev)}>
            <Name to={'/tasks/' + props.id}>{props.name}</Name>
            <Label>{props.priority}</Label>
            <Label1 to={'/projects/' + props.projectId}>{props.project}</Label1>
        </Card>
    )

}

export default KanbanCard;