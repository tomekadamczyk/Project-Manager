import React, { Component } from 'react';
import AreaChart from '../../components/Charts/AreaCharts/AreaChart';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <AreaChart 
                    chartTitle="All tasks"
                />
            </div>
        )
    }
}

export default Dashboard;