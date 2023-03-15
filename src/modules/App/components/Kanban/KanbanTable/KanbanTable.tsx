import React from 'react';
import { KanbanColumn } from './KanbanColumn/KanbanColumn';
import styled from 'styled-components';
import {Query} from 'react-apollo';
import Spinner from '../../UI/Spinner/Spinner';
import { GET_KANBAN_STATUSES } from 'queries/query/getStatuses';
import { useQuery } from '@apollo/client';

const Table = styled.div`
    width: 100%;
    display: flex;
    background: #fff;
    justify-content: space-between;
    padding-top: 20px;
`;

interface Status {
    id: number;
    name: string;
    tasks: any[];
}

export function KanbanTable() {

    const { loading, error, data } = useQuery(GET_KANBAN_STATUSES);
    if (loading) return <Spinner />;
    if (error) return <p>Błąd w pobieraniu tabeli</p>;
    
    return (
        <Table>
            {data.statuses.map((status: Status, index: number) => {
                return <KanbanColumn 
                    key={index} 
                    id={status.id} 
                    name={status.name} 
                    tasks={status.tasks}
                />
            })}
        </Table>
    )

}