import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import * as React from "react";
import Swal from 'sweetalert2';

export default function UpdatePassword(props){
    const [open, setOpen] = useState(false);
    const userLogin = useSelector((state) => state.auth);
    const [emailOldandNewPassword, setEmailOldandNewPassword] = useState({
        email: userLogin.userLogin.email,
        oldPassword: '',
        newPassword: '',
    });
    console.log(props.dataFromParentt,777)
    const MESSAGE_ERROR = {
        newPassword: 'Password error',
        confirmPassword: 'Password must be the same',
    };
    const REGEX = {
        newPassword: /^\w{6,8}$/,
    };
    const [form, setForm] = useState({});
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setOpen(props.dataFromParent)
    }, [props.dataFromParent]);

    const handleSubmitChangePassword = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3002/api/v1/users/change-password', {
                email: userLogin.userLogin.email,
                oldPassword: emailOldandNewPassword.oldPassword,
                newPassword: emailOldandNewPassword.newPassword,
            })
            .then(
                (response) => {
                    console.log(response);
                    handleClose();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Change Password Success',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                },
                (error) => {
                    console.log(error);
                    handleClose();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Incorrect Password!',
                    });
                },
            );
    }
    const handleInputChangePassword = (event) =>
        setEmailOldandNewPassword({
            ...emailOldandNewPassword,
            [event.target.name]: event.target.value,
        });

    const handleChangePassword = (event) => {
        let error = '';
        if (event.target.name === 'newPassword') {
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
                event.target.value === form.newPassword.value
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
        setEmailOldandNewPassword({
            ...emailOldandNewPassword,
            [event.target.name]: event.target.value,
        });
    };
    console.log(userLogin.userLogin, 999)
    return(
        <>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        width: 400,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <div
                        className="bg-white border flex flex-col p-4 pt-10"
                        style={{
                            marginBlockStart: '50px',
                            textAlign: 'center',
                        }}
                    >
                        <h4
                            style={{
                                color: 'Black',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                            }}
                        >
                            Change Your Password
                        </h4>
                        <br></br>
                        <form
                            // onSubmit={handleSubmitChangePassword}
                            className="flex flex-col justify-center items-center"
                        >
                            {props.dataFromParentt !== null ? (<input
                                onChange={handleInputChangePassword}
                                // value={email}
                                name="oldPassword"
                                placeholder="Old Password"
                                style={{
                                    marginBottom: '10px',
                                    padding: '10px',
                                    width: '100%',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    backgroundColor: '#f2f2f2',
                                    border: '1px solid #ccc',
                                }}
                                type="password"
                            ></input>) : null}
                            <br />
                            <br />
                            <div
                                className={`custom-input ${
                                    form.password && form.password.error && 'custom-input-error'
                                }`}
                            >
                                <input
                                    name="newPassword"
                                    value={(form.newPassword && form.newPassword.value) || ''}
                                    onChange={handleChangePassword}
                                    placeholder="New Password"
                                    style={{
                                        marginBottom: '10px',
                                        padding: '10px',
                                        width: '100%',
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        backgroundColor: '#f2f2f2',
                                        border: '1px solid #ccc',
                                    }}
                                    type={'password'}
                                ></input>
                                {form.newPassword && form.newPassword.error && (
                                    <p className="error">{form.newPassword.error}</p>
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
                                <input
                                    name="confirmPassword"
                                    onChange={handleChangePassword}
                                    placeholder="Re New Password"
                                    style={{
                                        marginBottom: '10px',
                                        padding: '10px',
                                        width: '100%',
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        backgroundColor: '#f2f2f2',
                                        border: '1px solid #ccc',
                                    }}
                                    type={'password'}
                                ></input>
                                {form.confirmPassword && form.confirmPassword.error && (
                                    <p className="error">{form.confirmPassword.error}</p>
                                )}
                            </div>
                            <br />
                            <div className="flex justify-center">
                                <button
                                    style={{
                                        background: '#f7a800',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: 'none'
                                    }}
                                    type="button"
                                    className="w-full"
                                    onClick={handleSubmitChangePassword}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </>
    )
}