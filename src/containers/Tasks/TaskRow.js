import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';

const LinkedCell = styled(TableCell)`
    cursor: pointer;
    position: relative;

    i {
        color: #0099ff;
        margin-left: 15px;
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity .3s, transform .3s;
    }

    &:hover {
        i {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

const Row = styled(TableRow)`
    &:hover {
        background: #f1f1f1;
    }
`;

const TaskRow = (props) => {

    return (
        <Row>
            <TableCell>{props.id}</TableCell>
            <LinkedCell onClick={props.clicked}>{props.name} <i className="fas fa-angle-right"></i></LinkedCell>
            <TableCell>{props.project}</TableCell>
            <TableCell>{props.status}</TableCell>
            <TableCell>{props.priority}</TableCell>
        </Row>
    )

}

export default TaskRow;