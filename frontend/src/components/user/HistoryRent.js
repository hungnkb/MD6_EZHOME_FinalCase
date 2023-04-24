import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { TextareaAutosize } from '@mui/base';
import {
  Box,
  Chip,
  Modal,
  OutlinedInput,
  Rating,
  Typography,
} from '@mui/material';
import Swal from 'sweetalert2';
import io from 'socket.io-client';

function HistoryRent() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    height: '%',
  };
  const styleBill = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const [status, setStatus] = React.useState('');
  const [historyRent, setHistoryRent] = useState([]);
  const [list, setList] = useState([]);
  const [openBill, setOpenBill] = useState(false);
  const handleOpen = () => setOpenBill(true);
  const handleClose = () => setOpenBill(false);
  const [addCharge, setAddCharge] = useState(0);
  const [dataOrder, setDataOrder] = useState({});
  const [openReview, setOpenReview] = useState(false);
  const [review, setReview] = useState('');
  const [value, setValue] = useState(2);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);
  const socket = io.connect(
    `${process.env.REACT_APP_BASE_URL_SERVER}/notifications`,
  );

  useEffect(() => {
    axios
      .get(
        `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem(
          'idUser',
        )}`,
      )
      .then((res) => {
        setHistoryRent(res.data);
        setList(res.data);
      });
  }, []);
  useEffect(() => {
    if (status === 'all') {
      const getDataRent = async () => {
        const dataList = await axios.get(
          `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem(
            'idUser',
          )}`,
        );
        setList(dataList.data);
      };
      getDataRent();
    } else {
      const getDataRent = async () => {
        const dataList = await axios.get(
          `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem(
            'idUser',
          )}&&status=${status}`,
        );
        setList(dataList.data);
      };
      getDataRent();
    }
  }, [status]);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleButtonClick = (event) => {
    const id = event.target.getAttribute('data-id');
    doSomethingWithId(id);
  };
  const doSomethingWithId = async (idOrder) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:3002/api/v1/orders/${idOrder}`).then(
          (response) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Success Cancel',
              showConfirmButton: false,
              timer: 2000,
            });
            axios
              .get(
                `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem(
                  'idUser',
                )}`,
              )
              .then((res) => {
                setList(res.data);
              });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Cannot Cancel!',
            });
          },
        );
      }
    });
  };

  const handleCheckout = (checkout, checkin, index) => {
    const timeStampToDate = 3600 * 24 * 7 * 4 * 30;
    const now = Date.now();
    const checkoutDate = new Date(checkout).getTime();
    const diff = (checkoutDate - now) / timeStampToDate;
    let isCheckined;
    now - new Date(checkin).getTime() > 0
      ? (isCheckined = true)
      : (isCheckined = false);
    setDataOrder(list[index]);
    if (Math.floor(diff) <= 0) {
      setOpenBill(true);
    } else if (Math.floor(diff) > 0) {
      setOpenBill(true);
      setAddCharge(list[index].idHome.price * Math.floor(diff));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You can't checkout now!",
      });
    }
  };

  const handleSubmitCheckout = async () => {
    axios({
      method: 'POST',
      url: process.env.REACT_APP_BASE_URL + '/orders/checkout',
      data: {
        order: dataOrder,
        addCharge,
      },
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token')),
      },
    })
      .then((res) => {
        setOpenReview(true);
      })
      .catch((err) => {});
  };

  const handleSubmitReview = async () => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/reviews`, {
        rate_stars: value,
        contents: review,
        idHome: dataOrder.idHome.idHome,
        idUser: dataOrder.idUser.idUser,
      })
      .then((res) => {
        socket.emit('send', {
          data: `${dataOrder.idHome.idHome}`,
          idReciever: dataOrder.idHome.idUser.idUser,
        });
        handleCloseReview();
      })
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Done. See you!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <br />
      <h2 style={{ marginLeft: '8%' }}>My Orders</h2>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, marginLeft: '8%' }}
      >
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={status}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="all">All Order</MenuItem>
          <MenuItem value="ongoing">On Going</MenuItem>
          <MenuItem value="done">Done</MenuItem>
          <MenuItem value="cancelled">Cancel</MenuItem>
        </Select>
      </FormControl>
      <TableContainer
        component={Paper}
        sx={{
          height: '80%',
          width: '90%',
          marginLeft: '8%',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b> # </b>{' '}
              </TableCell>
              <TableCell align="center">
                <b> Home </b>{' '}
              </TableCell>
              <TableCell align="center">
                <b> Checkin</b>{' '}
              </TableCell>
              <TableCell align="center">
                <b> Checkout </b>{' '}
              </TableCell>
              <TableCell align="center">
                <b>Charge </b>{' '}
              </TableCell>
              <TableCell align="center">
                <b>Status </b>{' '}
              </TableCell>
              <TableCell align="center"> </TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              ? list.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <b> {index + 1} </b>
                    </TableCell>
                    <TableCell align="center">{data.idHome.title}</TableCell>
                    <TableCell align="center">{data.checkin}</TableCell>
                    <TableCell align="center">{data.checkout}</TableCell>
                    <TableCell align="center">
                      {data.charged.toLocaleString('en-EN')}VNĐ
                    </TableCell>
                    {data.status === 'ongoing' ? (
                      <>
                        <TableCell align="center">
                          <Chip label="On Going" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleButtonClick}
                            data-id={data.idOrder}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={() =>
                              handleCheckout(data.checkout, data.checkin, index)
                            }
                            data-id={data.idOrder}
                          >
                            Checkout
                          </Button>
                        </TableCell>
                      </>
                    ) : data.status === 'done' ? (
                      <TableCell align="center">
                        <Chip
                          label="Rented"
                          color="success"
                          sx={{ width: '80px' }}
                        />
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <Chip label="Cancel" color="warning" />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Modal
          open={openBill}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBill}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Bill
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You need add more đ{addCharge.toLocaleString('en-EN')}
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '25px',
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: '#f7a800' }}
                onClick={handleSubmitCheckout}
              >
                Checkout
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openReview}
          onClose={handleCloseReview}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBill}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Rate us
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box component="form" noValidate autoComplete="off">
                <FormControl sx={{ width: '25ch' }}>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <textarea
                    name="textarea"
                    style={{ marginTop: '20px', width: 'auto' }}
                    rows="10"
                    cols="10"
                    placeholder="Give us your feedback"
                    onChange={(e) => setReview(e.target.value)}
                  />
                </FormControl>
              </Box>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={handleSubmitReview}
                >
                  Done
                </Button>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default HistoryRent;
