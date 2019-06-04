import React from 'react';

const Input = (props) => {
    return (
        <Input onBlur={props.updateName} type="text" placeholder={props.name} defaultValue={props.name}/>
    )
}
