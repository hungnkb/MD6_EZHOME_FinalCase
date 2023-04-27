import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../api/axios';
import {useSelector} from 'react-redux';
import {Button, ButtonGroup, InputAdornment, Switch, TextField} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';

function DashboardHosting() {
    const [homeList, setHomeList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const currentAuth = useSelector((state) => state.auth);
    const [checked, setChecked] = useState(null);
    const [flag, setFlag] = useState(false);

    const label = {inputProps: {true: 'false'}};
    const navigate = useNavigate();
    const [item, setItem] = useState();
    const [lgShow, setLgShow] = useState(false);
    const handleChange = async (event, id) => {
        await axios({
            method: 'POST',
            url: 'http://localhost:3002/api/v1/homes/status',
            data: {
                idHome: id,
                status: event.target.checked,
            },
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token')),
            },
        });
        setFlag(!flag);
        setChecked(event.target.checked);
    };

    const getData = (data) => {
        setItem(data);
        setLgShow(true);
    };

    useEffect(() => {
        if (!currentAuth.isLogined) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const getDataHome = async () => {
            const dataList = await axios.get(
                `http://localhost:3002/api/v1/homes?idUser=${currentAuth.userLogin.sub}`,
                {
                    headers: {Authorization: JSON.parse(localStorage.getItem('token'))},
                },
            );
            setHomeList(dataList.data);
        };
        getDataHome();
    }, [currentAuth.isLogined, flag]);
    return (
        <>
            <div className="container">
                <br/>
                <br/>
                <h3>{homeList.length} house for rent</h3>
                <br/>
                <Button
                        onClick={() => {
                            navigate('/user/revenue');
                        }}
                        sx={{color: "black", background: "white", border: "1px solid black", borderRadius:"30px"}}
                        variant="light"
                    >
                        Revenue
                    </Button>
                    <Button
                        onClick={() => {
                            navigate('/user/home');
                        }}
                        sx={{color: "black", background: "white", border: "1px solid black", marginLeft:"20px", borderRadius:"30px"}}
                        variant="light"
                    >
                        Views order
                    </Button>
            </div>
            <br/>
            <div className="row">
                <div className="col-4">
                    <TextField style={{ border:"1px solid black", marginLeft:"10%"}}
                        placeholder="Search"
                        type="search"
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </InputAdornment>
                            ),
                        }}
                    />

                </div>
                <div className="col-4">

                </div>
                <div className="col-4">
                    <Button
                        onClick={() => {
                            navigate('/create-home');
                        }}
                        sx={{color: "black", background: "white", border: "1px solid black", marginLeft: "45%"}}
                        variant="light"
                    >
                        +Create a rental item
                    </Button>
                </div>
            </div>
            <br/>
            <TableContainer component={Paper} style={{marginBottom:"400px"}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b style={{color:"gray"}}> Order </b>
                            </TableCell>
                            <TableCell align="center">
                                <b style={{color:"gray"}}> Image </b>
                            </TableCell>
                            <TableCell align="center">
                                <b style={{color:"gray"}}> Title </b>
                            </TableCell>
                            <TableCell align="center">
                                <b style={{color:"gray"}}> Address</b>
                            </TableCell>
                            <TableCell align="center">
                                <b style={{color:"gray"}}> Category</b>
                            </TableCell>
                            <TableCell align="center">
                                <b style={{color:"gray"}}>Bathrooms </b>
                            </TableCell>
                            <TableCell align="center">
                                <b style={{color:"gray"}}> Bedrooms</b>
                            </TableCell>
                            <TableCell align="center">
                                <b style={{color:"gray"}}>Price (đ) </b>
                            </TableCell>
                            <TableCell align="center">
                                <b style={{color:"gray"}}>Status </b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {homeList
                            ? homeList.map((data, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center" sx={{width: '10%', padding: '0px 0px'}}>
                                        <img
                                            style={{width: '50%', borderRadius: '5px'}}
                                            src={data?.images[0]?.urlHomeImage}
                                            alt="house"
                                        />
                                    </TableCell>
                                    <TableCell align="left" sx={{width: '30%'}}>
                                        <NavLink style={{color: "black"}} to={`/detail-dashboard/${data.idHome}`}>
                                            <b style={{color: "black"}}> {data.title} </b>
                                        </NavLink>

                                    </TableCell>
                                    <TableCell align="left">{data.address}</TableCell>
                                    <TableCell align="left">
                                        {data.idCategory.categoryName}
                                    </TableCell>
                                    <TableCell align="center">{data.bathrooms}</TableCell>
                                    <TableCell align="center">{data.bedrooms}</TableCell>
                                    {/*<TableCell align="left">{ReactHtmlParser(data.description)}</TableCell>*/}
                                    <TableCell align="right">
                                        {data.price.toLocaleString('en-EN')}
                                    </TableCell>
                                    {/*<TableCell align="center">{data.rate_stars}</TableCell>*/}
                                    <TableCell align="center">
                                        <Switch
                                            checked={data.status}
                                            onChange={(e) => handleChange(e, data.idHome)}
                                            inputProps={{true: 'false'}}
                                            color="warning"
                                        />
                                    </TableCell>
                                </TableRow>

                            ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

export default DashboardHosting;
