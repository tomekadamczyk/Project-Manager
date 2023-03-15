import { MouseEvent } from 'react';

interface Action { value: string, name: string, action: (e: MouseEvent<HTMLButtonElement>) => void };
interface ButtonProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    value: string | number | readonly string[];
    name: string | undefined;
    dir: 'up' | 'down';
}


function Button({ name, value, onClick, dir }: ButtonProps) {

    return (
        <button 
            style={{ background: '#fff', borderColor: 'transparent', padding: 0, lineHeight: '8px', cursor: 'pointer' }} 
            value={value} 
            name={name} 
            onClick={onClick}
        >
            <i style={{pointerEvents: 'none', lineHeight: '8px'}} className={`fas fa-angle-${dir}`}></i>
        </button>
    )
}

export function HeaderWithActions({ title, actionUp, actionDown }: { title: string; actionUp: Action; actionDown: Action; }) {

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{marginRight: 10}}>{title}</div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button name={actionUp.name} value={actionUp.value} onClick={actionUp.action} dir='up' />
                <Button name={actionDown.name} value={actionDown.value} onClick={actionDown.action} dir='down' />
            </div>
        </div>
    )
}