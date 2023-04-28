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
import FormControl from '@mui/material/FormControl';
import { MDBTabs, MDBTabsItem, MDBTabsLink } from 'mdb-react-ui-kit';
import { Box, Modal, Rating, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import { NavLink, useParams } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
export default function HistoryRent() {
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
  const [fetchData, setFetchData] = useState(false);
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
  }, [fetchData]);
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
  const handleChange = (value) => {
    setStatus(value);
  };

  const handleButtonClick = (event, idOwner) => {
    const id = event.target.getAttribute('data-id');
    doSomethingWithId(id, idOwner);
  };
  const doSomethingWithId = async (idOrder, idOwner) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f7a800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    })
      .then((result) => {
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
      })
      .then((res) => {
        socket.emit('send', {
          dataUrl: '/user/home',
          idReciever: idOwner,
          message: 'You have a new cancel order',
        });
      });
  };

  const handleCheckout = (checkout, checkin, index) => {
    const timeStampToDate = 3600 * 24 * 7 * 4 * 30;
    const now = Date.now();
    const checkoutDate = new Date(checkout).getTime();
    const diff = (now - checkoutDate) / timeStampToDate;
    let isCheckined;
    now - new Date(checkin).getTime() > 0
      ? (isCheckined = true)
      : (isCheckined = false);
    setDataOrder(list[index]);
    if (Math.floor(diff) <= 0 && isCheckined) {
      setOpenBill(true);
    } else if (Math.floor(diff) > 0 && isCheckined) {
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
          dataUrl: `/detail-home/${dataOrder.idHome.idHome}`,
          idReciever: dataOrder.idHome.idUser.idUser,
          message: 'You have new checkout and review',
        });
        handleClose();
        handleCloseReview();
      })
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Done. See you!',
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => {
          setFetchData(!fetchData);
        });
      });
  };
  const sumGoing = () => {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].status === 'ongoing') {
        sum++;
      }
    }
    return sum;
  };
  const sumDone = () => {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].status === 'done') {
        sum++;
      }
    }
    return sum;
  };
  const sumCancel = () => {
    let sum1 = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].status === 'cancelled') {
        sum1++;
      }
    }
    return sum1;
  };
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];
  return (
    <>
      <div style={{ marginBottom: '400px' }}>
        <br />
        <h2 style={{ marginLeft: '8%' }}>My Orders</h2>
        <Tabs
          handleChange={handleChange}
          status={status}
          sumGoing={sumGoing()}
          all={list.length}
          done={sumDone()}
          cancel={sumCancel()}
        />
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, marginLeft: '8%' }}
        ></FormControl>
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
                  <b> Number </b>{' '}
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
                <TableCell align="center">
                  <b> Action</b>{' '}
                </TableCell>
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
                      <TableCell align="left">
                        <NavLink
                          to={`/detail-home/${data.idHome.idHome}`}
                          style={{ color: 'black' }}
                        >
                          {' '}
                          {data.idHome.title}
                        </NavLink>{' '}
                      </TableCell>
                      <TableCell align="center">{data.checkin}</TableCell>
                      <TableCell align="center">{data.checkout}</TableCell>
                      <TableCell align="center">
                        {data.charged.toLocaleString('en-EN')}VNĐ
                      </TableCell>
                      {data.status === 'ongoing' ? (
                        <>
                          <TableCell align="left">
                            <p style={{ color: '#f7a800' }}>
                              <i className="fa-solid fa-circle"></i> On going
                            </p>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                height: 100,
                                transform: 'translateZ(0px)',
                                flexGrow: 1,
                              }}
                            >
                              <SpeedDial
                                ariaLabel="SpeedDial openIcon example"
                                sx={{ position: 'absolute', bottom: 16, right: 16, '& .MuiFab-primary': { backgroundColor: 'gray', color: 'white', width: 30, height: 30, '& .MuiSpeedDialIcon-icon': { fontSize: 20 }, '&:hover': {backgroundColor: 'black'} } }}
                                icon={<SpeedDialIcon openIcon={<EditIcon/>} />}
                              >
                                <SpeedDialAction
                                  onClick={(event) =>
                                    handleButtonClick(event, data.idHome.idUser)
                                  }
                                  sx={{color:"red"}}
                                  data-id={data.idOrder}
                                  icon={
                                    <>
                                      <i className="fa-solid fa-circle-xmark"></i>
                                    </>
                                  }
                                  tooltipTitle="Cancel"

                                />
                                  <SpeedDialAction
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    handleCheckout(
                                      data.checkout,
                                      data.checkin,
                                      index,
                                    )
                                  }
                                  data-id={data.idOrder}
                                  sx={{color:"green"}}
                                  icon={
                                    <>
                                       <i className="fa-solid fa-money-check-dollar-pen"></i>
                                    </>
                                  }
                                  tooltipTitle="Checkout"
                                />
                              </SpeedDial>
                            
                            </Box>
                          </TableCell>
                          {/* <TableCell>
                            <p
                              onClick={(event) =>
                                handleButtonClick(event, data.idHome.idUser)
                              }
                              data-id={data.idOrder}
                              style={{ cursor: 'pointer', color: 'red' }}
                            >
                              <i className="fa-solid fa-circle-xmark"></i>{' '}
                              Cancel
                            </p>
                          </TableCell> */}
                          {/* <TableCell>
                            <p
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                handleCheckout(
                                  data.checkout,
                                  data.checkin,
                                  index,
                                )
                              }
                              data-id={data.idOrder}
                            >
                              <i className="fa-solid fa-money-check-dollar-pen"></i>{' '}
                              Checkout
                            </p>
                          </TableCell> */}
                        </>
                      ) : data.status === 'done' ? (
                        <TableCell align="left">
                          <p style={{ color: 'green' }}>
                            <i className="fa-solid fa-circle"></i> Done
                          </p>
                        </TableCell>
                      ) : (
                        <TableCell align="left">
                          <p style={{ color: 'red' }}>
                            <i className="fa-solid fa-circle"></i> Cancelled
                          </p>
                        </TableCell>
                      )}
                      <TableCell align="center"></TableCell>
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
            size="lg"
          >
            <Box sx={styleBill}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Rate us
              </Typography>
              <Typography id="modal-modal-description">
                <Box component="form" noValidate autoComplete="off">
                  <FormControl sx={{ width: '38ch' }}>
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
      </div>
    </>
  );
}

export function Tabs(props) {
  return (
    <>
      <MDBTabs justify className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => props.handleChange('all')}
            active={props.status === 'all'}
          >
            <b> All order ({props.all})</b>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => props.handleChange('ongoing')}
            active={props.status === 'ongoing'}
          >
            <b> On going ({props.sumGoing}) </b>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => props.handleChange('done')}
            active={props.status === 'done'}
          >
            <b> Done ({props.done})</b>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => props.handleChange('cancelled')}
            active={props.status === 'cancelled'}
          >
            <b> Cancel({props.cancel})</b>
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
    </>
  );
}
