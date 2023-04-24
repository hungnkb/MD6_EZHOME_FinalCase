import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button} from "@mui/material";
const RevenueChart = () => {
    const [monthYearFillter, setMonthYearFillter] = useState({
        month: '',
        year: ''
    })
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Doanh thu theo phòng',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }],
    });

    useEffect(() => {
        axios.get(`http://localhost:3002/api/v1/homes/revenue?idUser=${localStorage.getItem('idUser')}`)
            .then(response => {
                const labels = response.data.map(item => `${item.homes_title}`);
                const revenues = response.data.map(item => item.revenue);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Doanh thu theo phòng',
                        data: revenues,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }],
                });
            });
    }, []);
    const handleChange = (event) => {
        setMonthYearFillter({
            ...monthYearFillter,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmitFillter = () => {
        axios.get(`http://localhost:3002/api/v1/homes/revenue?idUser=${localStorage.getItem('idUser')}&&month=${monthYearFillter.month}&&year=${monthYearFillter.year}`)
            .then(response => {
                const labels = response.data.map(item => `${item.homes_title}`);
                const revenues = response.data.map(item => item.revenue);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Doanh thu theo phòng',
                        data: revenues,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }],
                });
            });
    }

    return (
        <div style={{marginTop: 50}}>
            <Row>
                <Col sm={8}>
                    <div style={{height: "700px", width: "100%", marginLeft: "1%"}}>
                        <Bar options={{ maintainAspectRatio: false, responsive: true}} data={chartData}/>
                    </div>
                </Col>
                <Col sm={4}>
                    <div style={{marginLeft: "40%"}}>
                        <h3 >Profit Report</h3>
                    </div>
                    <Row style={{marginTop: "30px"}}>
                        <Col sm={4}>
                            <h5 style={{margin: 0}}>Year:</h5>
                            <select name="year" onChange={handleChange}>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </select>
                        </Col>
                        <Col sm={4}>
                            <h5 style={{margin: 0}}>Month:</h5>
                            <select name="month" onChange={handleChange}>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </Col>
                        <Col sm={4} >
                            <Button onClick={handleSubmitFillter} style={{marginTop: "13px", background: '#f7a800'}} variant="contained">Select</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    );
};

export default RevenueChart;