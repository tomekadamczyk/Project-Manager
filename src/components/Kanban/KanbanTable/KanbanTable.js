import React from 'react';
import KanbanColumn from './KanbanColumn/KanbanColumn';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Spinner from '../../UI/Spinner/Spinner';

const GET_STATUSES = gql`
    query Status {
        statuses {
            id,
            name,
            tasks {
                id,
                name,
                priorityId {
                    name
                },
                projectsId {
                    id,
                    name
                }
            }
        }
    }
`;

const Table = styled.div`
    width: 100%;
    display: flex;
    background: #fff;
    justify-content: space-between;
    padding-top: 20px;
`;

const KanbanTable = (props) => {

    return (
            <Query query={GET_STATUSES}>
                {({loading, error, data}) => {
                    if (loading) return <Spinner />;
                    if (error) return <p>Błąd w pobieraniu tabeli</p>

                    return (
                        <Table>
                        {data.statuses.map((status, index) => {
                            return <KanbanColumn 
                                key={index} 
                                id={status.id} 
                                name={status.name} 
                                tasks={status.tasks}
                            />
                        })}
                        </Table>
                    )
                }}
            </Query>
    )

}

export default KanbanTable;