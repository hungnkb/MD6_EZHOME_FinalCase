import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
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
export default function CreateHome24() {
  const [descriptions, setDescriptions] = useState(null);
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [titles, setTitles] = useState(null);
  const [prices, setPrices] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.createHome);

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

  const handleFinish = async () => {
    const title = currentState.title;
    const price = currentState.price;
    const address = currentState.address;
    const bathrooms = currentState.bathrooms;
    const bedrooms = currentState.bedrooms;
    const description = currentState.description;
    const email = 'hungnkb@gmail.com';
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
    // let newHome = await axios({
    //   method: 'post',
    //   url: 'http://localhost:3002/api/v1/homes',
    //   data: { title, price, address, bathrooms, bedrooms, description, email, idCategory, files },
    //   headers: {'Content-Type': 'application/json'}
    // })
    let newHome = await axios({
      method: 'post',
      url: 'http://localhost:3002/api/v1/homes/image',
      data: { files: files },
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (newHome) {
      console.log(newHome);
    }
  };

  return (
    <>
      <div className="row" style={{ height: '450px' }}>
        <div className="col-5">
          <h1 style={{ fontSize: '350%' }}>
            It’s easy to get started on EZHOME
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
                style={{ marginLeft: '50px', background: '#e9ecef' }}
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
                style={{ marginLeft: '50px', background: '#e9ecef' }}
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
                onChange={(e) => setDescriptions(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Button
            id="btn-back"
            onClick={() => navigate('/create-home2/3')}
            variant="contained"
          >
            Back
          </Button>
          {descriptions && titles && prices ? (
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
