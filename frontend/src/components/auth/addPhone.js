import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from '../../api/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFetDataUser, setRole } from '../../redux/features/authSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddPhone(props) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.setIsHost(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAuth = useSelector(state => state.auth);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Required phone number'),
    }),
    onSubmit: (values) => {
      handleClose();
      axios({
        method: 'PUT',
        url: 'http://localhost:3002/api/v1/users/',
        data: {
          phone: values.phone,
          role: 'host',
        },
        headers: {
          Authorization: JSON.parse(localStorage.getItem('token')),
        },
      })
        .then(() => {
          axios({
            method: 'GET',
            url: `http://localhost:3002/api/v1/users/active-host/${currentAuth.userLogin.sub}`,
          }).then(() => {
            dispatch(setRole({ role: 'host' }));
            dispatch(setIsFetDataUser());
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              setOpen(!open);
              navigate('/user/hosting');
            });
          })
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong',
          }).then(() => {
            navigate('/');
          });
        });
    },
  });

  return (
    <>
      {!props.isHost && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
              ></Typography>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <h3 htmlFor="firstName">Phone number</h3>
                </div>
                <TextField
                  id="phone"
                  name="phone"
                  type="text"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div style={{ color: 'red' }}>{formik.errors.phone}</div>
                ) : null}
                <div style={{ textAlign: 'center' }}>
                  <Button
                    style={{ background: '#f7a800', marginTop: '10px' }}
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default AddPhone;
