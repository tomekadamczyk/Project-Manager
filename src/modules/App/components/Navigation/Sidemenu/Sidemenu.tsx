import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationIcons from '../NavigationItems/NavigationIcons/NavigationIcons';
import { ExpandableSidebar } from '../ExpandableSidebar/ExpandableSidebar';

export const Sidemenu = () => {
    
    return (
        <ExpandableSidebar 
            navItems={<NavigationItems />} 
            navIcons={<NavigationIcons />}
        />
    )
}