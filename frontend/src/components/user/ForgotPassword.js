import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import GoogleButton from '../google/GoogleLogin';
import * as Yup from 'yup';
import { clearErrors, registerUser } from '../../service/userAction';
import Auth from '../auth/Auth';
import axios from '../../api/axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Modal,
  Box,
  DialogContent,
} from '@mui/material';
import Swal from 'sweetalert2';

export default function ForgotPassword(props) {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const [userForgotPassword, setUserForgotPassword] = useState({
    email: '',
  });
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Không được để trống')
        .email('Vui lòng nhập đúng định dạng Email'),
      password: Yup.string()
        .required('Không được để trống')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/,
          'Tối thiểu 6 và tối đa 8 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
        ),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
      navigate('/login');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3002/api/v1/users/forgot-password', {
        email: userForgotPassword.email,
      })
      .then(
        (response) => {
          handleClose();
          console.log(response, 222);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Please Check Your Email!',
            showConfirmButton: false,
            timer: 2000,
          });
        },
        (error) => {
          handleClose();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email not found!',
          });
        },
      );
  };

  const handleChange = (event) =>
    setUserForgotPassword({
      ...userForgotPassword,
      [event.target.name]: event.target.value,
    });
  console.log(userForgotPassword.email);

  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Register
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              width: 400,
              height: 500,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="bg-white border flex flex-col p-4 pt-10 drop-shadow-md"
              style={{
                marginBlockStart: '50px',
                textAlign: 'center',
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
              >
                <label style={{ fontSize: '22px' }}>Your Email Address:</label>
                <br />
                <br />
                <TextField
                  className="form-control"
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  size="small"
                  valueDefault={formik.values.email}
                  onChange={handleChange}
                  error={!!formik.errors.email && formik.touched.email}
                  helperText={
                    formik.errors.email && formik.touched.email
                      ? formik.errors.email
                      : null
                  }
                />
                <br />
                <br />
                <Button
                  style={{ background: '#f7a800',width:"100%" }}
                  type="submit"
                  className="bg-primary-blue font-medium py-2 rounded text-white w-full"
                >
                  Submit
                </Button>
              </form>
            </div>

            <div className="bg-white border p-5 text-center drop-shadow-md">
              <span>
                You have account ?{' '}
                <Link
                  onClick={() => {
                    props.setIsLogin(1);
                  }}
                  className="text-primary-blue"
                  style={{ color: '#e85710' }}
                >
                  Register
                </Link>
              </span>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
