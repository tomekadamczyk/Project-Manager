import React from 'react';
import NavigationIcon from './NavigationIcon/NavigationIcon';
import SubmenuItems from '../../Submenu/SubmenuItems/SubmenuItems';


const NavigationIcons = () => {
    
    return (
        <>
            <NavigationIcon><i className="fas fa-solar-panel"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-project-diagram"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-columns"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-tasks"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-user"></i></NavigationIcon>
            <NavigationIcon><i className="fas fa-plus"></i><SubmenuItems /></NavigationIcon>
        </>
    )
}

export default NavigationIcons;