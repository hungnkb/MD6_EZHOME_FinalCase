import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import {Modal} from "@mui/material";
import UpdatePassword from "./UpdatePassword";

export default function UpdateUser() {
    const [age, setAge] = React.useState("");
    const userLogin = useSelector((state) => state.auth);
    const [dataUser, setDataUser] = useState({});
    const [data, setData] = useState(false);
    const [dataPassword, setDataPassword] = useState();
    const [email, setEmail] = useState(null);

    console.log(userLogin.userLogin, 7777777)
    const MESSAGE_ERROR = {
        newPassword: 'Password error',
        confirmPassword: 'Password must be the same',
    };
    const REGEX = {
        newPassword: /^\w{6,8}$/,
    };
    const [form, setForm] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3002/api/v1/users?email=${email}`)
            .then((response) => {
                console.log(response.data,2222)
                const {fullName, phone, address} = response.data
                setDataUser({fullName, phone, address})
                setDataPassword(response.data.password)
            })
    }, [email])
    console.log(userLogin,23232332)
    useEffect(() => {
        if (userLogin.userLogin.email){
            localStorage.setItem('email', userLogin.userLogin.email);
            setEmail(localStorage.getItem("email"));
        }
    },[userLogin])


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3002/api/v1/users', {
                email: email,
                fullName: dataUser.fullName,
                phone: dataUser.phone,
                address: dataUser.address
            }).then(
            (response) => {
                console.log(response)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Change Profile Success',
                    showConfirmButton: false,
                    timer: 2000,
                })
            },
            (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Phone Number Already Exist!',
                });
            },
        );
    };

    const handleChange = (event) =>
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value,
        });

    const handleOpenComponentChild = (event) => {
        setData(!data)
    }
    console.log(dataUser,888)
    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%", marginTop: "20px", marginBottom: "20px" }}>
                <Box sx={{ padding: 5 }}>
                    <form
                        onSubmit={handleSubmit}
                    >
                    <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
                        My Proflie
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    fontWeight: 700
                                }}
                            >
                                Full Name
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                required
                                id="title"
                                name="fullName"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                                onChange={handleChange}
                                // placeholder={dataUser.fullName}
                                // defaultvalue={dataUser.fullName}
                                value={`${dataUser?.fullName ? dataUser.fullName : ""}`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    fontWeight: 700
                                }}
                            >
                                Address
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                id="outlined-multiline-static"
                                name="address"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={handleChange}
                                value={`${dataUser?.address ? dataUser.address : ""}`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    fontWeight: 700
                                }}
                            >
                                Phone
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                type="text"
                                required
                                id="author"
                                name="phone"
                                value={`${dataUser?.phone ? dataUser.phone : ""}`}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{
                            marginTop: 2,
                        }}
                        >
                            <Link style={{marginLeft: "295px"}} onClick={handleOpenComponentChild}>
                                Change Password
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} />
                        <Grid item xs={12} sm={5} />
                        <Grid item xs={12} sm={4}>
                            <button
                                style={{
                                    background: '#f7a800',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: 'none'
                                }}
                                type="submit"
                                className="w-full"
                            >
                                Submit
                            </button>
                        </Grid>
                        <Grid item xs={12} sm={5} />
                    </Grid>
                    </form>
                    <UpdatePassword dataFromParent={data} dataFromParentt={dataPassword}/>
                </Box>
            </Paper>
        </React.Fragment>
    );
}