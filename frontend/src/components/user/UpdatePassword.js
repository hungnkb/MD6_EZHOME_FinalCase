import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import * as React from 'react';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';;
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function UpdatePassword(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const [open, setOpen] = useState(false);
  const userLogin = useSelector((state) => state.auth);
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
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(props.dataFromParent);
  }, [props.dataFromParent]);

  const handleSubmitChangePassword = (event) => {
    event.preventDefault();
    if (emailOldandNewPassword.newPassword.length >= 6){
        axios
            .post('http://localhost:3002/api/v1/users/change-password', {
                email: userLogin.userLogin.email,
                oldPassword: emailOldandNewPassword.oldPassword,
                newPassword: emailOldandNewPassword.newPassword,
            })
            .then(
                (response) => {
                    handleClose();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Change Password Success',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                },
                (error) => {
                    handleClose();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Incorrect Password!',
                    });
                },
            );
    }
  };
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
  return (
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
          <div className="bg-white border flex flex-col p-4 pt-10">
            <h4
              style={{
                marginLeft:"40px",
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
              {props.dataFromParentt !== null ? (
                <OutlinedInput
                  onChange={handleInputChangePassword}
                  name="oldPassword"
                  placeholder="Old Password"
                  style={{
                    height:"50px",
                    marginBottom: '10px',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    fontSize: '16px',
                    backgroundColor: '#f2f2f2',
                    border: '1px solid #ccc',
                  }}
                  type={showPassword ? 'text' : 'password'}
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
                />
              ) : null}
              <br />
              <br />
              <div
                className={`custom-input ${
                  form.password && form.password.error && 'custom-input-error'
                }`}
              >
                <OutlinedInput
                  name="newPassword"
                  value={(form.newPassword && form.newPassword.value) || ''}
                  onChange={handleChangePassword}
                  placeholder="New Password"
                  style={{
                    height:"50px",
                    marginBottom: '10px',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    fontSize: '16px',
                    backgroundColor: '#f2f2f2',
                    border: '1px solid #ccc',
                  }}
                  type={showPassword1 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword1}
                        edge="end"
                      >
                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                   }
                />
                {form.newPassword && form.newPassword.error && (
                  <p style={{color: "red"}} className="error">{form.newPassword.error}</p>
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
                <OutlinedInput
                  name="confirmPassword"
                  onChange={handleChangePassword}
                  placeholder="Re New Password"
                  style={{
                    height:"50px",
                    marginBottom: '10px',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    fontSize: '16px',
                    backgroundColor: '#f2f2f2',
                    border: '1px solid #ccc',
                  }}
                  type={showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword2}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                   }
                />
                {form.confirmPassword && form.confirmPassword.error && (
                  <p style={{color: "red"}} className="error">{form.confirmPassword.error}</p>
                )}
              </div>
              <br />
              <div className="flex justify-center">
                <button
                  style={{
                    width:"100%",
                    background: '#f7a800',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '10px',
                    borderRadius: '5px',
                    border: 'none',
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
  );
}
