import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ProjectRow = (props) => {

    return (
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell onClick={props.clicked}>{props.name}</TableCell>
            <TableCell>{props.tasks ? props.tasks : <span>No assigned tasks</span>}</TableCell>
            <TableCell>{props.status}</TableCell>
            <TableCell>{props.priority}</TableCell>
            <TableCell>{props.client}</TableCell>
        </TableRow>
    )

}

export default ProjectRow;