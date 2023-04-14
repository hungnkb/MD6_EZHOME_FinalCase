import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { clearErrors, loginUser } from '../../service/userAction';
import axios from '../../api/axios';
import GoogleButton from '../google/GoogleLogin';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { setUserLogin } from '../../redux/features/authSlice';

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(0);
  const [items, setItems] = useState(null);
  const [userLogins, setUserLogins] = useState({
    email: '',
    password: '',
  });
  const currentState = useSelector((state) => state.auth);
  console.log(currentState);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Không được để trống')
        .email('Vui lòng nhập đúng định dạng Email'),
      password: Yup.string()
        .required('Không được để trống')
        .matches(
          /^^[a-zA-Z]\w{6,8}$/,
          'Bắt đầu bằng chữ. Tối thiểu 6 và tối đa 8 ký tự',
        ),
    }),
    onSubmit: (values) => {
      // dispatch(loginUser(values));
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await axios.post('http://localhost:3002/api/v1/auth', {
      email: userLogins.email,
      password: userLogins.password,
    });

    if (response) {
      localStorage.setItem('token', JSON.stringify(response.data.accessToken));
      dispatch(
        setUserLogin({
          isLogined: true,
          userLogin: response.data,
        }),
      );
    }
  };

  const handleChange = (event) =>
    setUserLogins({ ...userLogins, [event.target.name]: event.target.value });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        variant="light"
        onClick={() => {
          setIsLogin(1);
          handleClickOpen();
        }}
      >
        Login
      </div>
      {isLogin == 1 ? (
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
              <div className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
                >
                  <Typography
                    id="keep-mounted-modal-title"
                    variant="h4"
                    component="h2"
                    style={{ textAlign: 'center', marginBottom: '20px' }}
                  >
                    Login
                  </Typography>
                  <div>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      valueDefault={formik.values.email}
                      onChange={handleChange}
                      error={!!formik.errors.email && formik.touched.email}
                      helperText={
                        formik.errors.email && formik.touched.email
                          ? formik.errors.email
                          : null
                      }
                      required
                      size="small"
                    />
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <FormControl
                      error={
                        !!formik.errors.password && formik.touched.password
                      }
                      fullWidth
                      required
                      size="small"
                      value={formik.values.password}
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <FormHelperText style={{ color: '#d32f2f' }}>
                          {formik.errors.password}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>

                  <button
                    style={{
                      background: '#f7a800',
                      width: '100%',
                      marginTop: '10px',
                    }}
                    type="submit"
                    className="bg-primary-blue font-medium py-2 rounded text-white w-full"
                  >
                    Login
                  </button>
                  <div
                    style={{
                      width: '52%',
                      marginLeft: '100px',
                      marginTop: '10px',
                    }}
                  >
                    <GoogleButton />
                  </div>
                  <div
                    className="flex"
                    style={{ textAlign: 'center', marginTop: '5px' }}
                  >
                    <span className="my-3 text-gray-500">OR</span>
                  </div>
                  <Link
                    style={{
                      color: '#e85710',
                      marginLeft: '150px',
                      textDecoration: 'none',
                      marginTop: '5px',
                    }}
                    className="text-sm font-medium  text-blue-800"
                    onClick={() => {
                      setIsLogin(3);
                    }}
                  >
                    Forgot password?
                  </Link>
                </form>
              </div>

              <div className="bg-white border p-5 text-center drop-shadow-md">
                <span>
                  You don't have an account yet?{' '}
                  <Link
                    onClick={() => {
                      setIsLogin(2);
                    }}
                    className="text-primary-blue"
                    style={{ color: '#e85710', textDecoration: 'none' }}
                  >
                    Register
                  </Link>
                </span>
              </div>
            </Box>
          </Modal>
        </div>
      ) : null}
      {isLogin == 3 ? <ForgotPassword setIsLogin={setIsLogin} /> : null}
      {isLogin == 2 ? <Register setIsLogin={setIsLogin} /> : null}
    </>
  );
}

export default Login;
