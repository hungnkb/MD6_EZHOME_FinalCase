import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios";
import {Button, Dialog, DialogTitle, DialogActions, Modal, Box, DialogContent} from "@mui/material";

export default function ResetPassword() {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const [open, setOpen] = React.useState(true);
    const [emailTokenPassword, setEmailTokenPassword] = useState({
        email: email,
        token: token,
        password: ""
    })

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:3002/api/v1/users/password-reset', {email: emailTokenPassword.email, password: emailTokenPassword.password, token: emailTokenPassword.token})
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    };

    const handleChange = event => {
        setEmailTokenPassword({ ...emailTokenPassword, [event.target.name]: event.target.value });
    }
    console.log(emailTokenPassword)
    return (
        <>
            <div>

                <Modal open={open} onClose={handleClose}>
                    <Box sx={{
                        position: 'absolute',
                        width: 400,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <div
                            className="bg-white border flex flex-col p-4 pt-10 drop-shadow-md"
                            style={{marginBlockStart: "50px", textAlign: "center"}}
                        >
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col justify-center items-center"
                            >
                                <input value={email} name="email"></input>
                                <input  name="password" onChange={handleChange}></input>
                                <button style={{background: "#f7a800"}}
                                        type="submit"
                                        className="bg-primary-blue font-medium py-2 rounded text-white w-full"
                                >
                                    Submit
                                </button>
                                <span className="my-3 text-gray-500">OR</span>
                            </form>
                        </div>
                        <div className="bg-white border p-5 text-center drop-shadow-md">
                        </div>
                    </Box>
                </Modal>

            </div>
        </>
    );
}
