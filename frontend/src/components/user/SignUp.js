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
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { clearErrors, registerUser } from "../../service/userAction";
import Auth from "../auth/Auth";

function SignUp() {
    let navigate = useNavigate();
    const [userSignIn, setUserSignIn] = useState({
        email: "",
        password: "",
        phone:""
      }); 
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
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
            username: Yup.string().required("Không được để trống"),
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
    return (
        <>
            <Auth>
            <div 
            className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md"
            style={{marginBlockStart:"50px", textAlign:"center"}}
            >
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
                    >
                        
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            size="small"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!formik.errors.email && formik.touched.email}
                            helperText={
                                formik.errors.email && formik.touched.email
                                    ? formik.errors.email
                                    : null
                            }
                        />
            
                        <TextField
                            label="User Name" 
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={!!formik.errors.username && formik.touched.username}
                            helperText={
                                formik.errors.username && formik.touched.username
                                    ? formik.errors.username
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
                            onChange={formik.handleChange}
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
            </Auth>
        </>
    );
}

export default SignUp;
