import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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

export default function Register(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(true);
  const [emailTokenPassword, setEmailTokenPassword] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^\w{6,8}$/,
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users`,
        {
          email: emailTokenPassword.email,
          password: emailTokenPassword.password,
        },
      );
      setOpen(false);
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Register Success, please check your Email to Active',
        });
      }, 0);
    } catch (error) {
      setOpen(false);
      props.setIsLogin(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const error = validateFormField(name, value);

    setEmailTokenPassword({
      ...emailTokenPassword,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const validateFormField = (fieldName, fieldValue) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'email':
        if (!REGEX.email.test(fieldValue)) {
          errorMessage = 'Invalid email address';
        }
        break;
      case 'password':
        if (!REGEX.password.test(fieldValue)) {
          errorMessage = 'Password must be 6-8 characters long';
        }
        break;
      case 'confirmPassword':
        if (fieldValue !== emailTokenPassword.password) {
          errorMessage = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const isFormValid = () => {
    return !Object.keys(formErrors).some((fieldName) => formErrors[fieldName]);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              width: 500,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div className="bg-white border flex flex-col p-4 pt-10">
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
              <br></br>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={emailTokenPassword.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                  size="small"
                  style={{ marginBottom: '10px' }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={emailTokenPassword.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  required
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  style={{ marginBottom: '10px' }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={emailTokenPassword.confirmPassword}
                  onChange={handleInputChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  required
                  size="small"
                  type={showConfirmPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  style={{ marginBottom: '20px' }}
                />
                <div className="flex justify-center">
                  <Button
                    style={{
                      background: '#f7a800',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '10px',
                      borderRadius: '5px',
                      width: '100%',
                      textTransform: 'none',
                    }}
                    type="submit"
                    disabled={!isFormValid()}
                  >
                    Register
                  </Button>
                </div>
              </form>
            </div>
            <div className="bg-white border p-5 text-center drop-shadow-md">
              <span>
                Already have an account?{' '}
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
      )}
    </div>
  );
}
