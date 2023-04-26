import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  setBath,
  setBed,
  setDefault,
  setDesc,
  setPrice,
  setTitle,
} from '../../../redux/features/homeSlice';
import axios from '../../../api/axios';
import './style.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import ProgressBar from 'react-bootstrap/ProgressBar';
export default function CreateHome24() {
  const [descriptions, setDescriptions] = useState(null);
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [titles, setTitles] = useState(null);
  const [prices, setPrices] = useState(1);
  const [formatPrice, setFormatValue] = useState(1);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.createHome);
  const currentAuth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentAuth.isLogined) {
      navigate('/');
    }
  }, []);

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
    dispatch(setBed(bedrooms));
    dispatch(setBath(bathrooms));
  }, [bedrooms, bathrooms]);

  const handleFinish = async () => {
    const title = titles;
    const price = prices;
    const address = currentState.address;
    const description = descriptions;
    const email = currentAuth.userLogin.email;
    const idCategory = currentState.idCategory;
    const files = currentState.files;

    document.querySelector('.finish-create-home').innerHTML = `
    <div class="dot-flasing">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
    `;

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
          }).then(() => {
            dispatch(setDefault());
            navigate('/user/hosting');
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        });
    }
  };

  const handleFormatPrice = (e) => {
    const number = Number(e.target.value.replaceAll(',', ''));
    const formattedNumber = new Intl.NumberFormat('en-EN').format(number);
    setValue(formattedNumber);
  };

  return (
    <>
      <center>
        <h2>Some more information about your home</h2>
      </center>
      <div className="row" style={{ marginBottom: '20%' }}>
        <div className="col-5">
          <br />
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
              type="text"
              min="1"
              onChange={(e) => {
                if (
                  Number(e.target.value.split(',').join('')) <= 0 ||
                  isNaN(Number(e.target.value.split(',').join('')))
                ) {
                  e.target.value = 1;
                } else {
                  handleFormatPrice(e);
                  dispatch(
                    setPrice(Number(e.target.value.split(',').join(''))),
                  );
                  setPrices(Number(e.target.value.split(',').join('')));
                }
              }}
              defaultValue={currentState.price}
              value={value}
              aria-label="Amount (to the nearest dollar)"
            />
            <InputGroup.Text>đ</InputGroup.Text>
          </InputGroup>
          <div>
            <b>Bathrooms:</b>

            <Button
              type="button"
              variant="warning"
              style={{
                marginLeft: '10%',
                marginRight: '10%',
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
                marginLeft: '10%',
                background: '#e9ecef',
              }}
              onClick={() => handleBathroomsInscrease()}
            >
              +
            </Button>
          </div>
          <hr />
          <div>
            <b>Bedrooms: </b>
            <Button
              type="button"
              variant="warning"
              style={{
                marginLeft: '10%',
                marginRight: '10%',
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
                marginLeft: '10%',
                background: '#e9ecef',
              }}
              onClick={() => handleBedroomsInscrease()}
            >
              +
            </Button>
          </div>
        </div>
        <div className="col-7">
          <div style={{ width: 500, marginLeft: '10%' }}>
            <br />
            <CKEditor
              editor={ClassicEditor}
              data={currentState.description || ' '}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDesc(data);
                setDescriptions(data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </div>
        </div>
      </div>
      <div className="footer-end">
        <ProgressBar variant="dark" now={100} />
        <br />
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
              <Button
                className="finish-create-home"
                variant="contained"
                id="btn-finish1"
                onClick={(e) => {
                  handleFinish(e);
                }}
              >
                Finish
              </Button>
            ) : (
              <Button type="button" id="btn-finish2" variant="contained">
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
