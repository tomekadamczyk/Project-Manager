import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { SingleProjectDetails } from '../types';

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


const ProjectRow = ({ id, client, name, priority, status, tasks }: SingleProjectDetails) => {

    return (
        <Row>
            <TableCell>{id}</TableCell>
            <LinkedCell><Link to={`/projects/${id}`}>{name}</Link> <i className="fas fa-angle-right"></i></LinkedCell>
              
            <TableCell>{tasks ? tasks : <span>No assigned tasks</span>}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{priority}</TableCell>
            <TableCell>{client}</TableCell>
        </Row>
    )

}

export default ProjectRow;