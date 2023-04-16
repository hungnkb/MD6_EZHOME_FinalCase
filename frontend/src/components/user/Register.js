import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { registerUser } from '../../service/userAction';
import axios from '../../api/axios';
import { Button, Modal, Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';

export default function Register(props) {
  const [open, setOpen] = React.useState(true);
  const [err, setErr] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState({
    email: '',
    password: '',
    phone: '',
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
        .email('Invalid email address')
        .required('Email Required'),
      password: Yup.string().required('Password Required'),
    }),
    onSubmit: (values) => {
      try {
        dispatch(registerUser(values));
        navigate('/login');
      } catch (e) {
        setErr(e.message);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3002/api/v1/users', {
        email: userSignUp.email,
        password: userSignUp.password,
        phone: userSignUp.phone,
      })
      .then(
        (response) => {
          handleClose();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Register success',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        },
      );
  };

  const handleChange = (event) =>
    setUserSignUp({
      ...userSignUp,
      [event.target.name]: event.target.value,
    });
  return (
    <>
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              width: 500,
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
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h4"
                  component="h2"
                  style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                >
                  Register
                </Typography>
                <div>
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
                </div>
                <div style={{ marginTop: '10px' }}>
                  <TextField
                    className="form-control"
                    label="Phone"
                    type="text"
                    name="phone"
                    valueDefault={formik.values.phone}
                    onChange={handleChange}
                    error={!!formik.errors.phone && formik.touched.phone}
                    helperText={
                      formik.errors.phone && formik.touched.phone
                        ? formik.errors.phone
                        : null
                    }
                    size="small"
                    fullWidth
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <FormControl
                    error={!!formik.errors.password && formik.touched.password}
                    fullWidth
                    size="small"
                    valueDefault={formik.values.password}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      name="password"
                      autoComplete="on"
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <PasswordStrengthBar
                      password={formik.values.password}
                      minLength={1}
                      minScore={4}
                      scoreWords={['Yếu', 'Trung bình', 'Tốt', 'Mạnh']}
                      shortScoreWord={'Quá ngắn'}
                    />

                    {formik.errors.password && formik.touched.password ? (
                      <FormHelperText style={{ color: '#d32f2f' }}>
                        {formik.errors.password}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </div>
                <Button
                  style={{
                    background: '#f7a800',
                    width: '100%',
                    marginTop: '10px',
                  }}
                  type="submit"
                  className="bg-primary-blue font-medium py-2 rounded text-white w-full"
                >
                  Register
                </Button>
              </form>
            </div>

            <div className="bg-white border p-5 text-center drop-shadow-md">
              <span>
                You already have an account?{' '}
                <Link
                  onClick={() => {
                    props.setIsLogin(1);
                  }}
                  className="text-primary-blue"
                  style={{ color: '#e85710' }}
                >
                  Login
                </Link>
              </span>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
