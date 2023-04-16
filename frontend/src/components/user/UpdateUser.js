import * as React from "react";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Input from '@mui/material/Input';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import {Modal} from "@mui/material";
import UpdatePassword from "./UpdatePassword";

export default function UpdateUser() {
    const [age, setAge] = React.useState("");
    const userLogin = useSelector((state) => state.auth);
    const [dataUser, setDataUser] = useState({});
    const [data, setData] = useState(true)
    const [newDataUser, setnewDataUser] = useState({
        fullName: '',
        phone: '',
        address: '',
    });
    const [emailOldandNewPassword, setEmailOldandNewPassword] = useState({
        email: userLogin.userLogin.email,
        oldPassword: '',
        newPassword: '',
    });
    const MESSAGE_ERROR = {
        newPassword: 'Password error',
        confirmPassword: 'Password must be the same',
    };
    const REGEX = {
        newPassword: /^\w{6,8}$/,
    };
    const [form, setForm] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3002/api/v1/users?email=${userLogin.userLogin.email}`)
            .then((response) => {
                setDataUser(response.data[0])
            })
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3002/api/v1/users', {
                email: dataUser.email,
                fullName: newDataUser.fullName,
                phone: newDataUser.phone,
                address: newDataUser.address
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
                    text: 'Error Try Again!',
                });
            },
        );
    };

    const handleChange = (event) =>
        setnewDataUser({
            ...newDataUser,
            [event.target.name]: event.target.value,
        });

    console.log(emailOldandNewPassword)
    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
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
                                label="Title"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                                onChange={handleChange}
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
                                type="number"
                                required
                                id="author"
                                name="phone"
                                // label={dataUser.phone}
                                defaultValue={dataUser.phone}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            {/*<Link onClick={handleClose}>*/}
                            {/*    Change Password*/}
                            {/*</Link>*/}
                        </Grid>
                        <UpdatePassword dataFromParent={data}/>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="author"
                                name="author"
                                label="Author"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
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
                                label="Content"
                                name="address"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/*<Grid item xs={12} sm={2}>*/}
                        {/*    <InputLabel*/}
                        {/*        sx={{*/}
                        {/*            display: "flex",*/}
                        {/*            justifyContent: "center",*/}
                        {/*            fontWeight: 700*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        Img Upload*/}
                        {/*    </InputLabel>*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12} sm={4}>*/}
                        {/*    <Button>*/}
                        {/*        <UploadFileIcon />*/}
                        {/*    </Button>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12} sm={6} />
                        <Grid item xs={12} sm={5} />
                        <Grid item xs={12} sm={4}>
                            <Button type="submit" variant="contained" sx={{ color: "#ff781f" }}>
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={5} />
                    </Grid>
                    </form>
                </Box>
            </Paper>
        </React.Fragment>
    );
}
