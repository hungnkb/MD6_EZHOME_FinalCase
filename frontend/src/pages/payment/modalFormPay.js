import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import Payment from '../../components/payment/Payment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ModalFormPay(props) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.setOpenBill(false);
  };
  const currentAuth = useSelector((state) => state.auth);
  const socket = io.connect(
    `${process.env.REACT_APP_BASE_URL_SERVER}/notifications`,
  );

  useEffect(() => {
    setOpen(true);
  }, [props.openBill]);

  const handleBook = () => {
    setOpen(false);
    if (currentAuth.userLogin.sub === props.idOwner) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can not order your own home!',
      });
    } else {
      axios({
        method: 'post',
        url: process.env.REACT_APP_BASE_URL + '/orders',
        data: props.dataForm,
      })
        .then((res) => {
          handleClose();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success!',
          });
        })
        .then((res) => {
          socket.emit('send', {
            dataUrl: '/user/home',
            idReciever: props.idOwner,
            message: `Home ${props.dataForm.idHome} have a new order`,
          });
        })
        .catch((error) => {
          props.setIsFormPayOpen(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
          });
        });
    }
  };

  return (
    <>
      {props.openBill && (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h2>Confirm booking</h2>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <table>
                  <tr>
                    <td width="245px">
                      <b>Checkin:</b>
                    </td>
                    <td>{props.dataForm.checkin}</td>
                  </tr>
                  <tr>
                    <td width="245px">
                      <b>Checkout:</b>
                    </td>
                    <td>{props.dataForm.checkout}</td>
                  </tr>
                  <tr>
                    <td width="245px">
                      <b>Distcount code:</b>
                    </td>
                    <td>
                      <b style={{ color: 'red' }}>- 30% </b>
                    </td>
                  </tr>
                  <tr>
                    <td width="245px">
                      <b>Old price:</b>
                    </td>
                    <td>
                      <del>7,302,405đ</del>
                    </td>
                  </tr>
                  <tr>
                    <td width="245px">
                      <b>Total:</b>
                    </td>
                    <td>đ{props.dataForm.charged.toLocaleString('en-EN')}</td>
                  </tr>
                </table>
              </Typography>
              <Button
                variant="contained"
                style={{ background: 'gray', marginTop: '25px' }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Payment 
              charged={props.dataForm.charged}
              handleBook={handleBook}
              style={{
                marginLeft: '45%',
                background: '#f7a800',
                marginTop: '25px',
              }}
              />
              {/* <Button
                variant="contained"
                style={{
                  marginLeft: '45%',
                  background: '#f7a800',
                  marginTop: '25px',
                }}
                onClick={handleBook}
              >
                Submit
              </Button> */}
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
