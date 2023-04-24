import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import * as yup from "yup";
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import HistoryRent from './HistoryRent';
import {setNewPhone} from "../../redux/features/authSlice";
import { Button } from 'react-bootstrap';

export default function UpdateUser() {
    const [age, setAge] = React.useState("");
    const userLogin = useSelector((state) => state.auth);
    const [dataUser, setDataUser] = useState({});
    const [data, setData] = useState(false);
    const [dataPassword, setDataPassword] = useState();
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [email, setEmail] = useState(null);
    const dispatch = useDispatch((state) => state.auth);
    const [keyword, setKeyWord] = useState({
      fullname: false,
      phone: false,
    })

    useEffect(() => {
        axios.get(`http://localhost:3002/api/v1/users?email=${email}`)
            .then((response) => {
                console.log(response.data,2222)
                const {fullName, phone, address} = response.data
                setDataUser({fullName, phone, address})
                setDataPassword(response.data.password)
            })
    }, [email])
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
                console.log(response,34343)
                console.log(response)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Change Profile Success',
                    showConfirmButton: false,
                    timer: 2000,
                })
                dispatch(
                    setNewPhone({
                        newPhone: dataUser.phone
                    }),
                )
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
    console.log(email)
    const handleChange = (event) =>{
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value,
        });
    }

    const handleChangePhone = (event) =>{
        const value = event.target.value;
        const regex = /^\d{10}$/; //định dạng số điện thoại là 10 số

        if (regex.test(value)) {
            setPhone(value);
            setPhoneError(false);
        } else {
            setPhone("");
            setPhoneError(true);
        }
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value,
        });
    }
    const handleOpenComponentChild = (event) => {
        setData(!data)
    }

    const handleOpenEdit = (keywordInput) => {
      let kw = {...keyword}
      if (keywordInput == 'fullname' && keyword.fullname == false ) {
        kw.fullname = true;
        setKeyWord(kw);
      } else if (keywordInput == 'phone' && keyword.phone == false) {
        kw.phone = true;
        setKeyWord(kw);
      } else {
        kw.fullname = false;
        kw.phone = false;
        setKeyWord(kw);
      }
    }

    return (
      <>
      <br/>
      <br/>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2>
            Personal information
            </h2>
          </div>
        </div>
        <br/>
        <div className='row'>
          <div className='col-8' >
          <form onSubmit={handleSubmit}>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Fullname </p>
            </div>
            {keyword && keyword.fullname ? (<div className='col-2'><Button onClick={() => handleOpenEdit('fullname')} variant='light'>  <b><u> Save </u></b> </Button></div>) : (<div className='col-2'><Button onClick={() => handleOpenEdit('fullname')} variant='light'>  <b><u> Edit </u></b> </Button></div>)}
          </div>
          <div className='row'>
            <div className='col-12'>
            
            <Grid item xs={12} sm={10}>
                 {keyword && keyword.fullname ? (
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
                   value={`${dataUser?.fullName ? dataUser.fullName : ''}`}
                 />
                 ):  <p style={{color:"gray"}}>{`${dataUser?.fullName ? dataUser.fullName : ''}`} </p> }
                </Grid>
            </div>
          </div>
          </div>
          <hr/>
          <br/>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Address </p>
            </div>
            <div className='col-2'><Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <Grid item xs={12} sm={10}>
                  <TextField
                    id="outlined-multiline-static"
                    name="address"
                    multiline
                    fullWidth
                    rows={4}
                    onChange={handleChange}
                    value={`${dataUser?.address ? dataUser.address : ''}`}
                  />
                </Grid>
            </div>
          </div>
          </div>
          <hr/>
          <br/>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Phone number </p>
            </div>
            <div className='col-2'><Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
                <Grid item xs={12} sm={4}>
                  <TextField
                    type="text"
                    required
                    id="author"
                    name="phone"
                    value={`${dataUser?.phone ? dataUser.phone : ''}`}
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    error={phoneError}
                    helperText={
                      phoneError ? 'Vui lòng nhập số điện thoại hợp lệ' : ''
                    }
                    onChange={handleChangePhone}
                  />
                </Grid>
            </div>
          </div>
          </div>
          <hr/>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    marginTop: 2,
                  }}
                >
                  <Link
                    onClick={handleOpenComponentChild}
                  >
                    Change Password
                  </Link>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <button
                    style={{
                      background: '#f7a800',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '10px',
                      borderRadius: '5px',
                      border: 'none',
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
            <UpdatePassword
              dataFromParent={data}
              dataFromParentt={dataPassword}
            />

          </div>
          <div className='col-4' >

          </div> 

        </div>

      </div>
      </>
    );
}
