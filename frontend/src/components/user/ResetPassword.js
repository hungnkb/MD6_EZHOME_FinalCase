import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
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
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function ResetPassword() {
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [open, setOpen] = useState(true);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const [emailTokenPassword, setEmailTokenPassword] = useState({
    email: email,
    token: token,
    password: '',
  });
  const MESSAGE_ERROR = {
    username: 'Username error',
    email: 'Email error',
    password: 'Password must be in 6-8 letters',
    confirmPassword: 'Password must be the same',
  };

  const REGEX = {
    password: /^\w{6,8}$/,
  };
  const [form, setForm] = useState({});
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (flag) {
      setOpen(false);
    }
  }, [flag]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setFlag(true);
    axios
      .post('${process.env.REACT_APP_BASE_URL}api/v1/users/password-reset', {
        email: emailTokenPassword.email,
        password: emailTokenPassword.password,
        token: emailTokenPassword.token,
      })
      .then(
        (response) => {
          setOpen(false);
          setTimeout(() => {
            Toast.fire({
              icon: 'success',
              title: 'Change Password Successfull',
            });
          }, 0);
          navigate('/');
        },
        (error) => {
          Toast.fire({
            icon: 'error',
            title: 'Token Incorrect!',
          });
        },
      );
  };

  const handleChange = (event) => {
    let error = '';
    if (event.target.name === 'password') {
      if (form.confirmPassword && form.confirmPassword.value) {
        error =
          event.target.value === form.confirmPassword.value
            ? ''
            : MESSAGE_ERROR[event.target.name];
      } else {
        error = REGEX[event.target.name].test(event.target.value)
          ? ''
          : MESSAGE_ERROR[event.target.name];
      }
    } else if (event.target.name === 'confirmPassword') {
      error =
        event.target.value === form.password.value
          ? ''
          : MESSAGE_ERROR[event.target.name];
    } else {
      error = REGEX[event.target.name].test(event.target.value)
        ? ''
        : MESSAGE_ERROR[event.target.name];
    }
    setForm({
      ...form,
      [event.target.name]: { value: event.target.value, error: error },
    });
    setEmailTokenPassword({
      ...emailTokenPassword,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              width: 400,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '10px',
              // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              className="bg-white border flex flex-col p-4 pt-10"
              style={{
                // marginBlockStart: '50px',
                textAlign: 'center',
              }}
            >
              <h4
                style={{
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}
              >
                Change New Password
              </h4>
              <br></br>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
              >
                <input
                  value={email}
                  name="email"
                  placeholder="Email"
                  style={{
                    marginBottom: '10px',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    fontSize: '20px',
                    backgroundColor: '#f2f2f2',
                    border: '1px solid #ccc',
                  }}
                  readOnly
                />
                <br />
                <br />
                <div
                  className={`custom-input ${
                    form.password && form.password.error && 'custom-input-error'
                  }`}
                >
                  <OutlinedInput
                    name="password"
                    value={(form.password && form.password.value) || ''}
                    onChange={handleChange}
                    placeholder="New Password"
                    style={{
                      height: '50px',
                      marginBottom: '10px',
                      padding: '10px',
                      width: '100%',
                      borderRadius: '5px',
                      fontSize: '16px',
                      backgroundColor: '#f2f2f2',
                      border: '1px solid #ccc',
                    }}
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
                  />

                  {form.password && form.password.error && (
                    <p style={{ color: 'red' }} className="error">
                      {form.password.error}
                    </p>
                  )}
                </div>
                <br />
                <div
                  className={`custom-input ${
                    form.confirmPassword &&
                    form.confirmPassword.error &&
                    'custom-input-error'
                  }`}
                >
                  <OutlinedInput
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="Re New Password"
                    style={{
                      height: '50px',
                      marginBottom: '10px',
                      padding: '10px',
                      width: '100%',
                      borderRadius: '5px',
                      fontSize: '16px',
                      backgroundColor: '#f2f2f2',
                      border: '1px solid #ccc',
                    }}
                    type={showPassword1 ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                          edge="end"
                        >
                          {showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {form.confirmPassword && form.confirmPassword.error && (
                    <p style={{ color: 'red' }} className="error">
                      {form.confirmPassword.error}
                    </p>
                  )}
                </div>
                <br />
                <div className="flex justify-center">
                  <Button
                    style={{
                      background: '#f7a800',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '10px',
                      borderRadius: '5px',
                      width: '100%',
                    }}
                    type="submit"
                    className="w-full"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
            <div className="bg-white border p-5 text-center">
              <p style={{ color: '#6b7280' }}>Welcome To EZHome 1.0</p>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
