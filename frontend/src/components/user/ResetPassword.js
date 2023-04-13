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
    const MESSAGE_ERROR = {
        username: "Username error",
        email: "Email error",
        password: "Password error",
        confirmPassword: "Password must be the same"
    };

    const REGEX = {
        username: /^[a-zA-Z]{2,}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/
    };

    const [form, setForm] = useState({});
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
        let error = "";
        if (event.target.name === "password") {
            if (form.confirmPassword && form.confirmPassword.value) {
                error =
                    event.target.value === form.confirmPassword.value
                        ? ""
                        : MESSAGE_ERROR[event.target.name];
            } else {
                error = REGEX[event.target.name].test(event.target.value)
                    ? ""
                    : MESSAGE_ERROR[event.target.name];
            }
        } else if (event.target.name === "confirmPassword") {
            error =
                event.target.value === form.password.value
                    ? ""
                    : MESSAGE_ERROR[event.target.name];
        } else {
            error = REGEX[event.target.name].test(event.target.value)
                ? ""
                : MESSAGE_ERROR[event.target.name];
        }
        setForm({
            ...form,
            [event.target.name]: { value: event.target.value, error: error }
        });
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
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
                    }}>
                        <div
                            className="bg-white border flex flex-col p-4 pt-10"
                            style={{marginBlockStart: "50px", textAlign: "center"}}
                        >
                            <h4 style={{color: "#f7a800", fontWeight: "bold", marginBottom: "10px"}}>Change New Password</h4>
                            <br></br>
                            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                                <input value={email}
                                       name="email"
                                       placeholder="Email"
                                       style={{
                                           marginBottom: "10px",
                                           padding: "10px",
                                           width: "100%",
                                           borderRadius: "5px",
                                           fontSize: "16px",
                                           backgroundColor: "#f2f2f2",
                                           border: "1px solid #ccc"
                                       }} readOnly></input>
                                <br/>
                                <br/>
                                <div
                                    className={`custom-input ${form.password &&
                                    form.password.error &&
                                    "custom-input-error"}`}
                                >
                                <input name="password" value={(form.password && form.password.value) || ""} onChange={handleChange} placeholder="New Password" style={{
                                    marginBottom: "10px",
                                    padding: "10px",
                                    width: "100%",
                                    borderRadius: "5px",
                                    fontSize: "16px",
                                    backgroundColor: "#f2f2f2",
                                    border: "1px solid #ccc"
                                }} type={"password"}></input>
                                {form.password && form.password.error && (
                                    <p className="error">{form.password.error}</p>
                                )}
                                </div>
                                <br/>
                                <div
                                    className={`custom-input ${form.confirmPassword &&
                                    form.confirmPassword.error &&
                                    "custom-input-error"}`}
                                >
                                <input name="confirmPassword" onChange={handleChange} placeholder="Re New Password" style={{
                                    marginBottom: "10px",
                                    padding: "10px",
                                    width: "100%",
                                    borderRadius: "5px",
                                    fontSize: "16px",
                                    backgroundColor: "#f2f2f2",
                                    border: "1px solid #ccc"
                                }} type={"password"}></input>
                                    {form.confirmPassword && form.confirmPassword.error && (
                                        <p className="error">{form.confirmPassword.error}</p>
                                    )}
                                </div>
                                <br/>
                                <div className="flex justify-center">
                                    <button style={{background: "#f7a800", color: "#fff", fontWeight: "bold", padding: "10px", borderRadius: "5px"}} type="submit" className="w-full">
                                        Submit
                                    </button>
                                    
                                </div>
                            </form>
                        </div>
                        <div className="bg-white border p-5 text-center">
                            <p style={{color: "#6b7280"}}>Welcome To EZHome 1.0</p>
                        </div>
                    </Box>
                </Modal>



            </div>
        </>
    );
}