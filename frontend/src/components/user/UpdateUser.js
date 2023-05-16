import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import { setNewAvatarImage, setNewPhone } from '../../redux/features/authSlice';
import { Button } from 'react-bootstrap';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar } from '@mui/material';

export default function UpdateUser() {
  const [loading, setLoading] = useState(false);
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
    address: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users?email=${email}`)
      .then((response) => {
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
      .put(`${process.env.REACT_APP_BASE_URL}/users`, {
        email: email,
        fullName: dataUser.fullName,
        phone: dataUser.phone,
        address: dataUser.address,
      })
      .then(
        (response) => {
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
      kw.address = false;
      setKeyWord(kw);
    }
  };

  const preset_key = 'k4beq9j3';
  const cloud_name = 'djwjkwrjz';
  const handleUploadAvatar = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    setLoading(true);
    try {
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData,
        )
        .then((res) => {
          setImage(res.data.secure_url);
          setLoading(false);
          dispatch(
            setNewAvatarImage({
              newAvatarImage: res.data.secure_url,
            }),
          );
          axios
            .put(`${process.env.REACT_APP_BASE_URL}/users`, {
              email: email,
              image: res.data.secure_url,
            })
            .then(
              (response) => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Change Avatar Success',
                  showConfirmButton: false,
                  timer: 2000,
                });
                axios
                  .get(
                    `${process.env.REACT_APP_BASE_URL}/users?email=${email}`,
                  )
                  .then((response) => {
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
            );
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <br />
      <div className="container" style={{ marginBottom: '150px' }}>
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
                      {keyword && keyword.address ? (
                        <TextField
                          id="outlined-multiline-static"
                          name="address"
                          multiline
                          fullWidth
                          rows={4}
                          onChange={handleChange}
                          value={`${dataUser?.address ? dataUser.address : ''}`}
                        />
                      ) : (
                        <p style={{ color: 'gray' }}>
                          {`${dataUser?.address ? dataUser.address : ''}`}
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
                      {keyword && keyword.phone ? (
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
                            phoneError
                              ? 'Please enter a valid phone number'
                              : ''
                          }
                          onChange={handleChangePhone}
                        />
                      ) : (
                        <p style={{ color: 'gray' }}>{`${
                          dataUser?.phone ? dataUser.phone : ''
                        }`}</p>
                      )}
                    </Grid>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="col-4">
              <div>
                <MDBContainer
                  className="container py-5 h-100"
                  style={{ marginTop: '-50px' }}
                >
                  <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="12" xl="12">
                      <MDBCard style={{ borderRadius: '15px' }}>
                        <MDBCardBody className="text-center">
                          <div className="mt-3 mb-4">
                            {dataUser.image ? (
                              <Stack direction="row" spacing={2}>
                                <Avatar
                                  alt="img"
                                  src={dataUser.image}
                                  sx={{
                                    width: 150,
                                    height: 150,
                                    marginLeft: '28%',
                                  }}
                                />
                              </Stack>
                            ) : (
                              <Stack direction="row" spacing={2}>
                                <Avatar
                                  alt="img"
                                  src="https://tieuhocdongphuongyen.edu.vn/wp-content/uploads/2023/02/1676245765_401_Hinh-anh-Avatar-Trang-Dep-Cho-FB-Zalo-BI-AN.jpg"
                                  sx={{
                                    width: 150,
                                    height: 150,
                                    marginLeft: '28%',
                                  }}
                                />
                              </Stack>
                            )}
                          </div>
                          {loading && (
                            <CircularProgress
                              style={{ marginTop: '5px' }}
                              color="inherit"
                            />
                          )}
                          <div>
                            <label
                              htmlFor="upload"
                              style={{ cursor: 'pointer' }}
                            >
                              <u>
                                {' '}
                                <i className="fa-solid fa-arrow-up-from-bracket"></i>{' '}
                                Upload photos
                              </u>
                            </label>
                            <input
                              type="file"
                              name="image"
                              id="upload"
                              onChange={handleUploadAvatar}
                              style={{ opacity: 0 }}
                            />
                          </div>
                          <MDBTypography tag="h4">
                            {dataUser.fullName}
                          </MDBTypography>
                          <MDBCardText className="text-muted mb-4">
                            {email}
                          </MDBCardText>
                          <Link onClick={handleOpenComponentChild}>
                            Change Password
                          </Link>
                          <div className="d-flex justify-content-between text-center mt-5 mb-2"></div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </div>
            </div>
          </div>
        </form>
        <UpdatePassword dataFromParent={data} dataFromParentt={dataPassword} />
      </div>
    </>
  );
}
