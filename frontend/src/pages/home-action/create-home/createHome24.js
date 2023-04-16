import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBath,
  setBed,
  setDesc,
  setPrice,
  setTitle,
} from '../../../redux/features/homeSlice';
import axios from '../../../api/axios';
import './style.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
export default function CreateHome24() {
  const [descriptions, setDescriptions] = useState(null);
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [titles, setTitles] = useState(null);
  const [prices, setPrices] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.createHome);
  const currentAuth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentAuth.isLogined) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (bathrooms && bedrooms && descriptions) {
      dispatch(setDesc(descriptions));
      dispatch(setBath(bathrooms));
      dispatch(setBed(bedrooms));
    }
  }, [bathrooms, bedrooms, descriptions]);

  const handleBathroomsDescrease = () => {
    if (bathrooms > 1) {
      setBathrooms(bathrooms - 1);
    }
  };

  const handleBathroomsInscrease = () => {
    setBathrooms(bathrooms + 1);
  };

  const handleBedroomsDescrease = () => {
    if (bedrooms > 1) {
      setBedrooms(bedrooms - 1);
    }
  };

  const handleBedroomsInscrease = () => {
    setBedrooms(bedrooms + 1);
  };

  useEffect(() => {
    console.log(bedrooms, bathrooms);
    dispatch(setBed(bedrooms));
    dispatch(setBath(bathrooms));
  }, [bedrooms, bathrooms]);

  const handleFinish = async () => {
    const title = currentState.title;
    const price = currentState.price;
    const address = currentState.address;
    const bathrooms = currentState.bathrooms;
    const bedrooms = currentState.bedrooms;
    const description = currentState.description;
    const email = currentAuth.userLogin.email;
    const idCategory = currentState.idCategory;
    const files = currentState.files;
    console.log(
      title,
      price,
      address,
      bathrooms,
      bedrooms,
      description,
      email,
      idCategory,
      files,
    );

    let urlList = [];

    let uploadImageHome = await axios({
      method: 'post',
      url: 'http://localhost:3002/api/v1/homes/image',
      data: { files: files },
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    for (let i = 0; i < uploadImageHome.data.length; i++) {
      urlList.push(uploadImageHome.data[i].url);
    }

    if (uploadImageHome) {
      let newHome = await axios({
        method: 'post',
        url: 'http://localhost:3002/api/v1/homes',
        data: {
          title,
          price,
          address,
          bathrooms,
          bedrooms,
          description,
          email,
          idCategory,
          files: urlList,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(localStorage.getItem('token')),
        },
      })
        .then((response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your home has been saved',
            showConfirmButton: false,
            timer: 1500,
          }).then(navigate('/user/hosting'));
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>',
          }).then(navigate('/user/hosting'));
        });
    }
  };

  return (
    <>
      <div className="row" style={{ height: '450px' }}>
        <div className="col-5">
          <h1 style={{ fontSize: '300%', marginTop: '50px' }}>
            It’s easy to get started on{' '}
            <b style={{ color: '#f7a800' }}> EZHOME </b>
          </h1>
        </div>
        <div className="col-7">
          <h2>Some more information about your home</h2>
          <div style={{ width: 500, marginLeft: '30px' }}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Title
              </InputGroup.Text>
              <Form.Control
                as="input"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => {
                  dispatch(setTitle(e.target.value));
                  setTitles(e.target.value);
                }}
                defaultValue={currentState.title}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Price</InputGroup.Text>
              <Form.Control
                as="input"
                type="number"
                min="1"
                onChange={(e) => {
                  dispatch(setPrice(e.target.value));
                  setPrices(e.target.value);
                  if (e.target.value <= 0) {
                    e.target.value = 1;
                  }
                }}
                defaultValue={currentState.price}
                aria-label="Amount (to the nearest dollar)"
              />
              <InputGroup.Text>đ</InputGroup.Text>
            </InputGroup>
            <div>
              <p>Bathrooms:</p>

              <Button
                type="button"
                variant="warning"
                style={{
                  marginLeft: '50px',
                  marginRight: '50px',
                  background: '#e9ecef',
                }}
                onClick={() => handleBathroomsDescrease()}
              >
                {' '}
                -
              </Button>
              {bathrooms}
              <Button
                type="button"
                variant="warning"
                style={{
                  marginLeft: '50px',
                  background: '#e9ecef',
                }}
                onClick={() => handleBathroomsInscrease()}
              >
                +
              </Button>
            </div>
            <hr />
            <div>
              <p>Bedrooms:</p>
              <Button
                type="button"
                variant="warning"
                style={{
                  marginLeft: '50px',
                  marginRight: '50px',
                  background: '#e9ecef',
                }}
                onClick={() => handleBedroomsDescrease()}
              >
                {' '}
                -
              </Button>
              {bedrooms}
              <Button
                type="button"
                variant="warning"
                style={{
                  marginLeft: '50px',
                  background: '#e9ecef',
                }}
                onClick={() => handleBedroomsInscrease()}
              >
                +
              </Button>
            </div>
            <br />
            <InputGroup>
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Description"
                onChange={(e) => {
                  setDesc(e.target.value);
                  setDescriptions(e.target.value);
                }}
                defaultValue={currentState.description}
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Button
            id="btn-back"
            onClick={() => navigate('/create-home/3')}
            variant="contained"
          >
            Back
          </Button>
          {currentState.description &&
          currentState.title &&
          currentState.price ? (
            <Button variant="contained" id="btn-finish1" onClick={handleFinish}>
              Finish
            </Button>
          ) : (
            <Button type="button" id="btn-finish2" variant="contained">
              Finish
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
