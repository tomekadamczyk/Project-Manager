import React, { Component } from 'react';
import Chart from "react-apexcharts";
import styled from 'styled-components';
import { Query } from "react-apollo";
import Spinner from '../../UI/Spinner/Spinner';
import ApexCharts from 'apexcharts'

const Area = styled(Chart)`
    width: 100%;
    padding: 5px;
    background: #f9f9f9;
`;



const CHART_OPTIONS = {
    options: {
        labels: [],
        series: [],
        title: {
            text: null,
        },
        legend: {
            show: true,
            position: 'right',
            labels: {
                useSeriesColors: true
            },
            onItemHover: {
                highlightDataSeries: true
            }
        }
    }
}

class AreaChart extends Component {

    fillLabelsAndSeries = (data) => {
        const labels = [];
        const series = [];
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                const tasksAmount = element.tasks.length;
                series.push(tasksAmount);
            }
        }
        data.forEach((item) => {
            labels.push(item.name)
        });

        CHART_OPTIONS.options.labels = labels;
        CHART_OPTIONS.options.series = series;
        
    }

    render() {
        CHART_OPTIONS.options.title.text = this.props.chartTitle;
        return(
            <>
            <Query query={this.props.graphQLQuery} onCompleted={(data) => {
                this.fillLabelsAndSeries(data.statuses)}
            }>
                {({loading, error, data, refetch}) => {
                    if(loading) return <Spinner/>;
                    if(error) return <p>Nie mogę pobrać zadań></p>;
                    return(
                        <>
                        <Chart options={CHART_OPTIONS.options} series={CHART_OPTIONS.options.series} type={this.props.type} width="400" />
                        </>
                    )
                }}
            </Query>
            </>
        )
    }
}

export default AreaChart;