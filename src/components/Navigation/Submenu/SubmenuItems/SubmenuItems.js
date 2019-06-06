import React from 'react';
import styled from 'styled-components';
import SubmenuItem from './SubmenuItem/SubmenuItem';

const List = styled.ul`
    position: absolute;
    left: 100%;
    bottom: 0;
    background: #fff;
    border: 1px solid #fa4;
    padding: 0;
    list-style-type: none;
    opacity: 0;
    transform: translateX(-200%);
    transition: transform .3s, opacity 1s;
`;

const SubmenuItems = (props) => {
    return (
    <List>
        <SubmenuItem link='/projects/add-project'><li>Project</li></SubmenuItem>
        <SubmenuItem link='/tasks/add-task'><li>Task</li></SubmenuItem>
    </List>
    )
}

export default SubmenuItems;