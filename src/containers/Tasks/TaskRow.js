import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TaskRow = (props) => {

    return (
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell onClick={props.clicked}>{props.name}</TableCell>
            <TableCell>{props.project}</TableCell>
            <TableCell>{props.status}</TableCell>
            <TableCell>{props.priority}</TableCell>
        </TableRow>
    )

}

export default TaskRow;