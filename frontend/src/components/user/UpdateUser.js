import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import { setNewPhone } from '../../redux/features/authSlice';
import { Button } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

export default function UpdateUser() {
  const [age, setAge] = React.useState('');
  const userLogin = useSelector((state) => state.auth);
  const [dataUser, setDataUser] = useState({});
  const [data, setData] = useState(false);
  const [dataPassword, setDataPassword] = useState();
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch((state) => state.auth);
  const [image, setImage] = useState();
  const [keyword, setKeyWord] = useState({
    fullname: false,
    phone: false,
    address:false
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/v1/users?email=${email}`)
      .then((response) => {
        console.log(response.data, 2222);
        const { fullName, phone, address, image } = response.data;
        setDataUser({ fullName, phone, address, image });
        setDataPassword(response.data.password);
      });
  }, [email]);
  useEffect(() => {
    if (userLogin.userLogin.email) {
      localStorage.setItem('email', userLogin.userLogin.email);
      setEmail(localStorage.getItem('email'));
    }
  }, [userLogin]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put('http://localhost:3002/api/v1/users', {
        email: email,
        fullName: dataUser.fullName,
        phone: dataUser.phone,
        address: dataUser.address,
      })
      .then(
        (response) => {
          console.log(response, 34343);
          console.log(response);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Change Profile Success',
            showConfirmButton: false,
            timer: 2000,
          });
          dispatch(
            setNewPhone({
              newPhone: dataUser.phone,
            }),
          );
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
  console.log(dataUser);
  const handleChange = (event) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePhone = (event) => {
    const value = event.target.value;
    const regex = /^\d{10}$/; //định dạng số điện thoại là 10 số

    if (regex.test(value)) {
      setPhone(value);
      setPhoneError(false);
    } else {
      setPhone('');
      setPhoneError(true);
    }
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };
  const handleOpenComponentChild = (event) => {
    setData(!data);
  };

  const handleOpenEdit = (keywordInput) => {
    let kw = { ...keyword };
    if (keywordInput == 'fullname' && keyword.fullname == false) {
      kw.fullname = true;
      setKeyWord(kw);
    } else if (keywordInput == 'phone' && keyword.phone == false) {
      kw.phone = true;
      setKeyWord(kw);
    } else if (keywordInput == 'address' && keyword.address == false) {
      kw.address = true;
      setKeyWord(kw);
    } else {
      kw.fullname = false;
      kw.phone = false;
      kw.address = false
      setKeyWord(kw);
    }
  };

    const preset_key = 'k4beq9j3';
    const cloud_name = 'djwjkwrjz';
  const handleUploadAvatar = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", preset_key);
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
          .then(res => {
              setImage(res.data.secure_url);
              axios
                  .put('http://localhost:3002/api/v1/users', {
                      email: email,
                      image: res.data.secure_url
                  })
                  .then(
                      (response) => {
                          console.log(response, 34343);
                          console.log(response);
                          Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: 'Change Avatar Success',
                              showConfirmButton: false,
                              timer: 2000,
                          });
                          axios
                              .get(`http://localhost:3002/api/v1/users?email=${email}`)
                              .then((response) => {
                                  console.log(response.data, 2222);
                                  const { fullName, phone, address, image } = response.data;
                                  setDataUser({ fullName, phone, address, image });
                                  setDataPassword(response.data.password);
                              });
                      },
                      (error) => {
                          Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Some thing went wrong!',
                          });
                      },
                  )
          })
          .catch(err => console.log(err))
  }
    console.log(dataUser.image,44)

  return (
    <>
      <br />
      <br />
      <div className="container" style={{marginBottom:"150px"}}>
        <div className="row">
          <div className="col-12">
            <h2>Personal information</h2>
          </div>
        </div>
        <br />
            <form onSubmit={handleSubmit}>
               <div className="row">
          <div className="col-8">
              <div>
                <div className="row">
                  <div className="col-10">
                    <p>Fullname </p>
                  </div>
                  {keyword && keyword.fullname ? (
                    <div className="col-2">
                      <Button
                        onClick={() => handleOpenEdit('fullname')}
                        variant="light"
                      >
                        <h6>
                          <u> Save </u>
                        </h6>
                      </Button>
                    </div>
                  ) : (
                    <div className="col-2">
                      <Button
                        onClick={() => handleOpenEdit('fullname')}
                        variant="light"
                        type="submit"
                      >
                        <h6>
                          <u> Edit </u>
                        </h6>{' '}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-12">
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
                          value={`${
                            dataUser?.fullName ? dataUser.fullName : ''
                          }`}
                        />
                      ) : (
                        <p style={{ color: 'gray' }}>
                          {`${dataUser?.fullName ? dataUser.fullName : ''}`}{' '}
                        </p>
                      )}
                    </Grid>
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <div>
                <div className="row">
                  <div className="col-10">
                    <p>Address </p>
                  </div>
                  {keyword && keyword.address ? (
                    <div className="col-2">
                      <Button
                        onClick={() => handleOpenEdit('address')}
                        variant="light"
                      >
                        <h6>
                          <u> Save </u>
                        </h6>
                      </Button>
                    </div>
                  ) : (
                    <div className="col-2">
                      <Button
                        onClick={() => handleOpenEdit('address')}
                        variant="light"
                        type="submit"
                      >
                        <h6>
                          <u> Edit </u>
                        </h6>{' '}
                      </Button>
                    </div>
                  )}
                
                </div>
                <div className="row">
                  <div className="col-12">
                    <Grid item xs={12} sm={10}>
                      {keyword&& keyword.address?(
                                  <TextField
                        id="outlined-multiline-static"
                        name="address"
                        multiline
                        fullWidth
                        rows={4}
                        onChange={handleChange}
                        value={`${dataUser?.address ? dataUser.address : ''}`}
                      />
                      ):( <p style={{ color: 'gray' }}>
                      {`${dataUser?.address ? dataUser.address : ''}`}
                    </p>)}
            
                    </Grid>
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <div>
                <div className="row">
                  <div className="col-10">
                    <p>Phone number </p>
                  </div>
                 
                  {keyword && keyword.phone ? (
                    <div className="col-2">
                      <Button
                        onClick={() => handleOpenEdit('phone')}
                        variant="light"
                      >
                        <h6>
                          <u> Save </u>
                        </h6>
                      </Button>
                    </div>
                  ) : (
                    <div className="col-2">
                      <Button
                        onClick={() => handleOpenEdit('phone')}
                        variant="light"
                        type="submit"
                      >
                        <h6>
                          <u> Edit </u>
                        </h6>{' '}
                      </Button>
                    </div>
                  )}
                
                </div>
                <div className="row">
                  <div className="col-12">
                    <Grid item xs={12} sm={4}>
                      {keyword&& keyword.phone?(
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
                      ):<p style={{color:"gray"}}>{`${dataUser?.phone ? dataUser.phone : ''}`}</p>}
                     
                    </Grid>
                  </div>
                </div>
              </div>
              <hr />
              
               </div>
               <div className="col-4">
              <div>
      <MDBContainer className="container py-5 h-100" style={{marginTop:"-50px"}}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="12">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src={dataUser.image}
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                    <input type="file" name="image" onChange={handleUploadAvatar}></input>
                </div>
                <MDBTypography tag="h4">{dataUser.fullName}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                 {email}
                </MDBCardText>
                  <Link onClick={handleOpenComponentChild}>
                    Change Password
                  </Link>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
               </div>
            </div>
            </form>
            <UpdatePassword
              dataFromParent={data}
              dataFromParentt={dataPassword}
            />
      </div>
    </>
  );
}
