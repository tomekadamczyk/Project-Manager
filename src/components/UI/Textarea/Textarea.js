import React from 'react';

const TextArea = React.forwardRef((props, ref) => {
    return(
        <textarea updateDesc={props.updateDesc} type="text" placeholder={props.descritpion} defaultValue={props.descritpion} ref={ref}/>
    )
})

export default TextArea;