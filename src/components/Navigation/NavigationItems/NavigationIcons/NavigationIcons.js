import React from 'react';
import NavigationIcon from './NavigationIcon/NavigationIcon';

const NavigationIcons = (props) => {
    return (
        <>
            <NavigationIcon><i className="fas fa-solar-panel"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-project-diagram"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-columns"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-tasks"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-user"></i></NavigationIcon>
        </>
    )
}

export default NavigationIcons;