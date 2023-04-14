import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBath, setBed, setDesc, setPrice, setTitle } from '../../../redux/features/homeSlice';
import axios from '../../../api/axios';

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
  }, [bathrooms, bedrooms, descriptions])

  const handleBathroomsDescrease = () => {
    if (bathrooms > 0) {
      setBathrooms(bathrooms - 1);
    }
  }

  const handleBathroomsInscrease = () => {
    setBathrooms(bathrooms + 1);
  }

  const handleBedroomsDescrease = () => {
    if (bedrooms > 0) {
      setBedrooms(bedrooms - 1);
    }
  }

  const handleBedroomsInscrease = () => {
    setBedrooms(bedrooms + 1);
  }

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
    console.log(title, price, address, bathrooms, bedrooms, description, email, idCategory, files);
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
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    if (newHome) {
      console.log(newHome);
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: '50px', marginBottom: '50px' }}>
        <Grid
          container
          spacing={2}
          style={{ marginLeft: '5%', marginRight: '5%' }}
        >
          <Grid xs={6}>
            <p style={{ fontSize: '70px' }}>
              It’s easy to get started on EZHOME
            </p>
          </Grid>
          <Grid xs={6}>
            <h1>Some more information about your home</h1>
            <div>Title</div>
            <input onChange={(e) => { dispatch(setTitle(e.target.value)); setTitles(e.target.value) }}></input>
            <div>Price</div>
            <input type='number' onChange={(e) => {
              dispatch(setPrice(e.target.value));
              setPrices(e.target.value);
              if (e.target.value <= 0) {
                e.target.value = 1
              }
            }}></input>
            <div>
              Bathrooms:
              <button type='button' style={{ marginLeft: '50px', marginRight: '50px' }} onClick={() => handleBathroomsDescrease()}>-</button>
              {bathrooms}
              <button type='button' style={{ marginLeft: '50px' }} onClick={() => handleBathroomsInscrease()}>+</button>
            </div>
            <div>
              Bedrooms:
              <button type='button' style={{ marginLeft: '50px', marginRight: '50px' }} onClick={() => handleBedroomsDescrease()}>-</button>
              {bedrooms}
              <button type='button' style={{ marginLeft: '50px' }} onClick={() => handleBedroomsInscrease()}>+</button>
            </div>
            <input type='textarea' onChange={(e) => setDescriptions(e.target.value)}></input>
          </Grid>
        </Grid>
        <Grid style={{ marginLeft: '5%', marginRight: '5%' }}>
          <Button
            onClick={() => navigate('/create-home2/3')}
            variant="contained"
          >
            Back
          </Button>
          {descriptions && titles && prices ? (
            <Button variant="contained" onClick={handleFinish}>Finish</Button>
          ) : (
            <Button type='button' variant="contained" style={{ background: 'gray' }}>Finish</Button>
          )}

        </Grid>
      </Box>
    </>
  );
}
