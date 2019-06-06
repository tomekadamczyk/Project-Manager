import React from 'react';
import NavigationIcon from './NavigationIcon/NavigationIcon';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const List = styled.ul`
position: absolute;
left: 100%;
background: #ddd;

`;

const NavigationIcons = (props) => {
    const list = <List>
        <NavLink to='/projects/add-project'><li>Project</li></NavLink>
        <NavLink to='/tasks/add-task'><li>Task</li></NavLink>
    </List>
    return (
        <>
            <NavigationIcon><i className="fas fa-solar-panel"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-project-diagram"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-columns"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-tasks"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-user"></i></NavigationIcon>
            <NavigationIcon ><i className="fas fa-plus"></i>{list}</NavigationIcon>
        </>
    )
}

export default NavigationIcons;