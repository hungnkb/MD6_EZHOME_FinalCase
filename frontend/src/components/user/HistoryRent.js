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
import { Box, Chip, Modal, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

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
  const [filterValue, setFilterValue] = useState('');
  const [count, setCount] = useState(0);
  const [openBill, setOpenBill] = useState(false);
  const handleOpen = () => setOpenBill(true);
  const handleClose = () => setOpenBill(false);
  const [addCharge, setAddCharge] = useState(0);
  const [dataOrder, setDataOrder] = useState({});

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
    setCount(count + 1);
    doSomethingWithId(id);
  };
  const doSomethingWithId = async (idOrder) => {
    axios.patch(`http://localhost:3002/api/v1/orders/${idOrder}`).then(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success Cancel',
          showConfirmButton: false,
          timer: 2000,
        });
        setCount(count + 1);
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
  };

  const handleCheckout = (checkout, index) => {
    const timeStampToDate = 3600 * 24 * 7 * 4 * 30;
    const now = Date.now();
    const checkoutDate = new Date(checkout).getTime();
    const diff = (now - checkoutDate) / timeStampToDate;
    setDataOrder(list[index]);
    if (Math.floor(diff) === 0) {
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Checkout success. Thank you!',
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {});
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
                            onClick={() => handleCheckout(data.checkout, index)}
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
    </>
  );
}

export default HistoryRent;
