import { Visibility, VisibilityOff } from "@mui/icons-material";
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
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik } from 'formik'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { clearErrors, loginUser } from "../../service/userAction";
import Auth from "../auth/Auth";
import axios from "../../api/axios";
import GoogleButton from "../google/GoogleLogin";


function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState({
      email: "",
      password: ""
    });
    const { isAuthenticated, error } = useSelector(
      (state) => state.auth
    );
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
             .required("Không được để trống")
             .email("Vui lòng nhập đúng định dạng Email"),
        password: Yup.string()
             .required("Không được để trống")
             .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/,
              "Tối thiểu 6 và tối đa 8 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
          ),
      }),
      onSubmit: (values) => {
        dispatch(loginUser(values));
      },
    });
  
    const handleSubmit = event => {
      event.preventDefault();
      axios.post('http://localhost:3002/api/v1/auth', {email: userLogin.email, password: userLogin.password})
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      };
  
  const handleChange = event =>
  setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
  console.log(userLogin.email);
  
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
      if (isAuthenticated) {
        navigate("/");
      }
    }, [dispatch, error, isAuthenticated, navigate]);
  
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
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
        Login
    </Button>

      <Modal open={open} onClose={handleClose}>
  
         <Box sx={{ position: 'absolute', width: 500, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <div className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
      >
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
        <FormControl
          error={!!formik.errors.password && formik.touched.password}
          fullWidth
          required
          size="small"
          value ={formik.values.password}
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
            type={showPassword ? "text" : "password"}
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
          {formik.errors.password && formik.touched.password ? (
            <FormHelperText style={{ color: "#d32f2f" }}>
              {formik.errors.password}
            </FormHelperText>
          ) : null}
        </FormControl>
        <GoogleButton/>
        <button style={{background:"#f7a800"}}
          
          type="submit"
          className="bg-primary-blue font-medium py-2 rounded text-white w-full"
        >
          Login
        </button>
        <div className="flex">
          <span className="my-3 text-gray-500">Or</span>
        </div>
        <Link
          style={{color:"#e85710"}}
          to="/password/forgot"
          className="text-sm font-medium  text-blue-800"
        >
          Quên mật khẩu?
        </Link>
      </form>
    </div>

    <div className="bg-white border p-5 text-center drop-shadow-md">
      <span>
        Bạn chưa có tài khoản ư?{" "}
        <Link to="/register" className="text-primary-blue" style={{color:"#e85710"}}>
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

export default Login;