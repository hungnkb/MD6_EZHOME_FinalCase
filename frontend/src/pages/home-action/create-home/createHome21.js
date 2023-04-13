import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setCategory } from '../../../redux/features/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from "react-bootstrap/Card";
import BedIcon from "@mui/icons-material/Bed";
import * as React from "react";
import SingleBedIcon from '@mui/icons-material/SingleBed';
import "./style.css"
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CreateHome21() {
    const [check, setCheck] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const currentState = useSelector(state => state.createHome);
    useEffect(() => {
        setCheck(true)
    }, [currentState.idCategory])

    return (
        <>
            <div className="container" style={{marginTop:"70px"}}>
                <div className="row">
                    <div className="col-12">
                        <h1>Which of these best describes your place?</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Card.Body>
                            <Card className="card-createHome">
                                <Card.Body>
                                    <center>
                                       <SingleBedIcon/>  <Button id="btn" onClick={() => { dispatch(setCategory(1)); setCheck(true) }}><b> Single</b> </Button>
                                    </center>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </div>
                    <div className="col-6">
                        <Card.Body>
                           <Card className="card-createHome">
                                <Card.Body>
                                    <center>
                                    <BedIcon/><Button id="btn" onClick={() => { dispatch(setCategory(2)); setCheck(true) }}><b>Pair </b> </Button>
                                    </center>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Card.Body>
                           <Card className="card-createHome">
                                <Card.Body>
                                    <center>
                                        <i className='fas fa-user-tie'></i> <Button id="btn" onClick={() => { dispatch(setCategory(3)); setCheck(true) }}> <b> Presidential</b> </Button>
                                    </center>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </div>
                    <div className="col-6">
                        <Card.Body>
                           <Card className="card-createHome">
                                <Card.Body>
                                    <center>
                                        <i className="fa-solid fa-crown"></i> <Button id="btn" onClick={() => { dispatch(setCategory(4)); setCheck(true) }}> <b> VIP</b> </Button>
                                    </center>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Card.Body>
                           <Card className="card-createHome">
                                <Card.Body>
                                    <center>
                                        <i className='fas fa-hotel'></i>   <Button id="btn" onClick={() => { dispatch(setCategory(5)); setCheck(true) }}><b>Luxury </b> </Button>
                                    </center>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </div>
                </div>
                <div className="row" style={{marginTop:"90px"}}>
                    <div className="col-7">
                    </div>
                    <div className="col-5" style={{marginLeft:"900px"}}>
                        <Button style={{marginRight:"15px", background:"gray"}} onClick={() => navigate('/create-home2')} variant="contained">Back</Button>
                        {check ? (<Button style={{ background:"#f7a800"}} onClick={() => navigate('/create-home2/2')} variant="contained">Next</Button>) : null}
                    </div>
                </div>
            </div>
        </>

    );
}