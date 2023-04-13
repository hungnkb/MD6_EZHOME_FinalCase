import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik'
import React, { useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import GoogleButton from "../google/GoogleLogin";
import * as Yup from "yup";
import { clearErrors, registerUser } from "../../service/userAction";
import Auth from "../auth/Auth";
import axios from "../../api/axios";
import { Button, Dialog, DialogTitle, DialogActions, Modal, Box, DialogContent } from "@mui/material";

export default function Register() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState({
      email: "",
      password: "",
      phone:""
    }); 
  const dispatch = useDispatch();
  const formik = useFormik({
      initialValues: {
          email: "",
          password: "",
          phone: "",
       
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
          dispatch(registerUser(values));
          navigate("/login")
      },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };
  const handleSubmit = event => {
      event.preventDefault();
      axios.post('http://localhost:3002/api/v1/users', {email: userSignUp.email, password: userSignUp.password, phone: userSignUp.phone})
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      };

  const handleChange = event =>
  setUserSignUp({ ...userSignUp, [event.target.name]: event.target.value });
      console.log(userSignUp.email);

  return (
    <>
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
        Register
    </Button>
      <Modal open={open} onClose={handleClose}>
        
      <Box sx={{ position: 'absolute', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div 
            className="bg-white border flex flex-col p-4 pt-10 drop-shadow-md"
            style={{marginBlockStart:"50px", textAlign:"center"}}
            >
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center"
                    >
                        
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
                        <FormControl
                            error={!!formik.errors.password && formik.touched.password}
                            fullWidth
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
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <PasswordStrengthBar
                                password={formik.values.password}
                                minLength={1}
                                minScore={4}
                                scoreWords={["Yếu", "Trung bình", "Tốt", "Mạnh"]}
                                shortScoreWord={"Quá ngắn"}
                            />

                            {formik.errors.password && formik.touched.password ? (
                                <FormHelperText style={{color: "#d32f2f"}}>
                                    {formik.errors.password}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        
                        <button style={{background:"#f7a800"}}
                            type="submit"
                            className="bg-primary-blue font-medium py-2 rounded text-white w-full"
                        >
                            Đăng Ký
                        </button>
                        <span className="my-3 text-gray-500">OR</span>
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
            Bạn đã có tài khoản ?{" "}
              <Link to="/login" className="text-primary-blue" style={{color:"#e85710"}}>
              Đăng nhập
            </Link>
          </span>
                </div>
        </Box>
      </Modal>

    </div>
    </>
  );
}
