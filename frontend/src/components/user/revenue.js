import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from "axios";

const RevenueChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Doanh thu theo phòng',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        axios.get('http://localhost:3002/api/v1/homes/revenue')
            .then(response => {
                const labels = response.data.map(item => `Phòng ${item.title}`);
                const revenues = response.data.map(item => item.revenue);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Doanh thu theo phòng',
                        data: revenues,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                });
            });
    }, []);

    return (
        <div>
            <Bar style={{width: "60%", height: "30%"}} data={chartData} />
        </div>
    );
};

export default RevenueChart;