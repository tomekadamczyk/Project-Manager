import React, { Component } from 'react';
import Chart from "react-apexcharts";
import styled from 'styled-components';
import { Query } from "react-apollo";
import Spinner from '../../UI/Spinner/Spinner';
import ApexCharts from 'apexcharts'
import { DocumentNode } from 'graphql';
import { useQuery } from '@apollo/client';

const Area = styled(Chart)`
    width: 100%;
    padding: 5px;
    background: #f9f9f9;
`;

interface ChartOptions {
    options: {
        labels: any[];
        series: any[];
        title: {
            text: string | null;
        };
        legend: {
            show: boolean;
            position: any;
            labels: {
                useSeriesColors: boolean;
            };
            onItemHover: {
                highlightDataSeries: boolean;
            }
        }
    }
}

const CHART_OPTIONS: ChartOptions = {
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

interface AreaChartProps {
    chartTitle: string;
    graphQLQuery: DocumentNode;
    type: "line" | "area" | "bar" | "histogram" | "pie" | "donut" |
    "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "radar";
}

function AreaChart({ chartTitle, graphQLQuery, type }: AreaChartProps) {

    function fillLabelsAndSeries(data: any) {
        const labels: string[] = [];
        const series: any[] = [];
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                const tasksAmount = element.tasks.length;
                series.push(tasksAmount);
            }
        }
        data.forEach((item: any) => {
            labels.push(item.name)
        });

        CHART_OPTIONS.options.labels = labels;
        CHART_OPTIONS.options.series = series;
        
    }

    CHART_OPTIONS.options.title.text = chartTitle;
    const { loading, error } = useQuery(graphQLQuery, {
        onCompleted: (data) => {
            fillLabelsAndSeries(data.statuses)
        }
    });

    if(loading) return <Spinner/>;
    if(error) return <p>Nie mogę pobrać zadań</p>;

    return <Chart options={CHART_OPTIONS.options} series={CHART_OPTIONS.options.series} type={type} width="400" />
}

export default AreaChart;