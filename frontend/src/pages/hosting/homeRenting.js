import React, { useState, useEffect, setState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../api/axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

export default function HomeRenting(){
    const [homeRent, setHomeRent] = useState([]);
    const [homeRentted, setHomeRentted] = useState([]);
    const [status, setStatus] = React.useState('');
    const result = [];
    const navigate = useNavigate();
    useEffect(() => {
        const getDataRent = async () => {
            const dataList = await axios.get(
                `http://localhost:3002/api/v1/homes?idUser=${localStorage.getItem("idUser")}&&status=ongoing`
            );
            setHomeRent(dataList.data.filter(home => home.orders.length > 0))
        };
        getDataRent();
    }, []);
    useEffect(() => {
        const getDataRent = async () => {
            const dataList = await axios.get(
                `http://localhost:3002/api/v1/homes?idUser=${localStorage.getItem("idUser")}&&status=${status}`
            );
            setHomeRent(dataList.data.filter(home => home.orders.length > 0))
        };
        getDataRent();
    }, [status]);
    for(let i = 0; i< homeRent.length; i++){
        homeRent[i].orders.map(order => result.push({title: homeRent[i].title, address: homeRent[i].address, email: order.idUser.email, phone: order.idUser.phone, checkin: order.checkin, checkout: order.checkin}));
    }
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    return(
        <>
            <br />
            {/*<Button*/}
            {/*    onClick={() => {*/}
            {/*        navigate('/create-home');*/}
            {/*    }}*/}
            {/*    style={{ background: '#f7a800', marginLeft: '1100px' }}*/}
            {/*    variant="contained"*/}
            {/*>*/}
            {/*    {' '}*/}
            {/*    +Add home*/}
            {/*</Button>*/}
            <hr />
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="ongoing">On Going</MenuItem>
                        <MenuItem value="cancle">Cancel</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TableContainer component={Paper} sx={{
                height: "80%", width: "90%", marginLeft: "10%"
            }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b> {status} </b>{' '}
                            </TableCell>
                            <TableCell align="center">
                                <b> Email </b>{' '}
                            </TableCell>
                            {/*<TableCell align="center">*/}
                            {/*    {' '}*/}
                            {/*    <b> Total Price</b>{' '}*/}
                            {/*</TableCell>*/}
                            <TableCell align="center">
                                <b> Phone</b>{' '}
                            </TableCell>
                            <TableCell>
                                <b> Home </b>{' '}
                            </TableCell>
                            <TableCell align="center">
                                <b>Checkin </b>{' '}
                            </TableCell>
                            <TableCell align="center">
                                <b> Checkout</b>{' '}
                            </TableCell>
                            {/*<TableCell align="center">*/}
                            {/*    <b>Checkout </b>{' '}*/}
                            {/*</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result
                            ? result.map((data, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <b> {index + 1} </b>
                                    </TableCell>
                                    <TableCell align="left">{data.email}</TableCell>
                                    <TableCell align="left">{data.phone}</TableCell>
                                    <TableCell align="left">{data.title}</TableCell>
                                    <TableCell align="left">{data.checkin}</TableCell>
                                    <TableCell align="left">{data.checkout}</TableCell>
                                    {/*<TableCell align="left">*/}
                                    {/*    {data.idCategory.categoryName}*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="right">{data.bathrooms}</TableCell>*/}
                                    {/*<TableCell align="right">{data.bedrooms}</TableCell>*/}
                                    {/*<TableCell align="left">{data.description}</TableCell>*/}
                                    {/*<TableCell align="right">*/}
                                    {/*    {data.price.toLocaleString('en-EN')}*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="center">{data.rate_stars}</TableCell>*/}
                                    {/*<TableCell align="center">*/}
                                        {/*<Switch*/}
                                        {/*    checked={data.status}*/}
                                        {/*    onChange={(e) => handleChange(e, data.idHome)}*/}
                                        {/*    inputProps={{ true: 'false' }}*/}
                                        {/*    color="warning"*/}
                                        {/*/>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="center">*/}
                                    {/*    <i*/}
                                    {/*        className="fa-solid fa-pen-to-square"*/}
                                    {/*        style={{*/}
                                    {/*            color: 'green',*/}
                                    {/*            fontSize: '130%',*/}
                                    {/*        }}*/}
                                    {/*    ></i>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="center">*/}
                                    {/*    <i*/}
                                    {/*        className="fa-solid fa-trash"*/}
                                    {/*        style={{*/}
                                    {/*            color: 'red',*/}
                                    {/*            fontSize: '130%',*/}
                                    {/*        }}*/}
                                    {/*    ></i>*/}
                                    {/*</TableCell>*/}
                                </TableRow>
                            ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}