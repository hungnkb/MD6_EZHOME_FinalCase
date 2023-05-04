import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Datepicker} from '@mobiscroll/react';
import TextField from '@mui/material/TextField';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile,
} from 'mdb-react-ui-kit';
import {useState} from "react";
import axios from "axios";

export default function ModalCoupon({setIsFetchCouponList}) {
    const [open, setOpen] = React.useState(false);
    const [newDataCoupon, setNewDataCoupon] = useState({
        couponame: '',
        value: '',
        endDate: '',
        startDate: ''
    })
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setNewDataCoupon({
            ...newDataCoupon,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = () => {
        axios.post('http://localhost:3002/api/v1/coupons',
            {
                couponname: newDataCoupon.couponame,
                startDate: newDataCoupon.startDate,
                endDate: newDataCoupon.endDate,
                value: newDataCoupon.value,
                user: localStorage.getItem('idUser'),
                createDate: formattedToday
            })
            .then((response) => {
                console.log(response, 55);
                setIsFetchCouponList[1](!setIsFetchCouponList[0]);
            })
        handleClose();
    }

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                sx={{
                    color: 'black',
                    background: 'white',
                    border: '1px solid black',
                    borderRadius: '30px',
                    marginLeft: '80%',
                }}
                variant="light"
            >
                <i class="fa-solid fa-circle-plus"></i> Generate discount code
            </Button>
            <form onSubmit={handleSubmit}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    </DialogTitle>
                    <DialogContent>
                        <center><h3> Create voucher </h3></center>
                        <MDBContainer fluid>
                            <MDBRow className="d-flex justify-content-center align-items-center">
                                <MDBCol lg="12" className="my-5">
                                    <MDBCard>
                                        <MDBCardBody className="px-4">
                                            <MDBRow className="align-items-center pt-4 pb-3">
                                                <MDBCol md="5" className="ps-5">
                                                    <h6 className="mb-0"><b> Contents</b></h6>
                                                </MDBCol>

                                                <MDBCol md="7" className="pe-5">
                                                    <MDBInput size="lg" id="form1" type="text" name="couponame"
                                                              onChange={handleChange}/>
                                                </MDBCol>
                                            </MDBRow>

                                            <hr className="mx-n3"/>

                                            <MDBRow className="align-items-center pt-4 pb-3">
                                                <MDBCol md="5" className="ps-5">
                                                    <h6 className="mb-0"><b>According to % </b></h6>
                                                </MDBCol>

                                                <MDBCol md="7" className="pe-5">
                                                    <MDBInput size="lg" min="0" max="100" id="form2" type="number"
                                                              name="value" onChange={handleChange}/>
                                                </MDBCol>
                                            </MDBRow>

                                            <hr className="mx-n3"/>

                                            <MDBRow className="align-items-center pt-4 pb-3">
                                                <MDBCol md="5" className="ps-5">
                                                    <h6 className="mb-0"><b> Start date </b></h6>
                                                </MDBCol>

                                                <MDBCol md="7" className="pe-5">
                                                    <MDBInput size="lg" id="form2" type="date" name="startDate"
                                                              onChange={handleChange}/>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr className="mx-n3"/>

                                            <MDBRow className="align-items-center pt-4 pb-3">
                                                <MDBCol md="5" className="ps-5">
                                                    <h6 className="mb-0"><b> End date</b></h6>
                                                </MDBCol>

                                                <MDBCol md="7" className="pe-5">
                                                    <MDBInput size="lg" id="form2" type="date" name="endDate"
                                                              onChange={handleChange}/>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='' style={{background: "gray", color: "white", marginRight: "70%"}}
                                onClick={handleClose}>Cancel</Button>
                        <Button variant='warning' style={{background: "#f7a800", color: "white"}} onClick={handleSubmit}
                                autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>

    );
}
