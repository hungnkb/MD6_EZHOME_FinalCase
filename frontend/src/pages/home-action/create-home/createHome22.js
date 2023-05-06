import React, { useState, useEffect, useRef, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { countries } from './country.constant';
import TextField from '@mui/material/TextField';
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
} from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../../redux/features/homeSlice';
import './style.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import axios from 'axios';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const containerStyle = {
  width: '700px',
  height: '454px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function CreateHome22() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState('');
  const [libraries] = useState(['places']);
  const [check, setCheck] = useState(false);
  const [dataAddress, setDataAddress] = useState({
    addressLine: '',
    state: '',
    city: '',
    country: 'Viet Nam',
  });
  const [dataAddressStr, setDataAddressStr] = useState('');
  const [submitMap, setSubmitMap] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const google = window.google;
  const dispatch = useDispatch();
  const currentAuth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentAuth.isLogined) {
      navigate('/');
    }
  }, []);

  let infowindow;
  let geocoder;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDzzi_VBcf2Oef6LTViLU767UPNHlnIze4',
    libraries,
  });

  const onLoad = (marker) => {
    console.log('marker: ', marker);
  };

  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
    setMarkers([...markers, marker]);
    map.panTo(place.geometry.location);
    infowindow?.setContent(place.name || '');
    infowindow?.open(map);
  }

  useEffect(() => {
    if (dataAddressStr) {
      setCheck(true);
    }
  }, [dataAddressStr]);

  const handleSetAddress = () => {
    if (dataAddressStr) {
      dispatch(setAddress(dataAddressStr));
    }
  };

  const clearMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  const handleChange = (event) => {
    let { value } = event.target;
    if (value.length === 0) {
      // setCheck(false);
    }
  };

  const handleChangeInput = (event, keyword) => {
    setDataAddress({ ...dataAddress, [keyword]: event.target.value });
    let newAddress = '';

    for (let key in dataAddress) {
      if (dataAddress[key] != '') {
        if (key == 'country') {
          newAddress += dataAddress[key];
        } else {
          newAddress += dataAddress[key] + ', ';
        }
      }
    }
    setData({ address: newAddress });
    setDataAddressStr(newAddress);
  };

  useEffect(() => {
    const getData = async () => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${dataAddressStr}&key=${process.env.REACT_APP_GG_API_LIB_KEY}`,
        )
        .then((res) => {
          const newLocation = { ...location };
          newLocation.lat = res.data.results[0].geometry.location.lat;
          newLocation.lng = res.data.results[0].geometry.location.lng;
          setCurrentPosition(newLocation);
        });
    };
    getData();
  }, [submitMap]);

  // const handleGetPosition = (event) => {
  //   let { target } = event;
  //   let { keyCode } = event;
  //   let request = {
  //     query: target.value,
  //     fields: ['name', 'geometry'],
  //   };
  //   if (event.type === 'keydown') {
  //     if (keyCode === 13) {
  //       let service = new google.maps.places.PlacesService(map);
  //       service.findPlaceFromQuery(request, (results, status) => {
  //         clearMarker();
  //         if (status === google.maps.places.PlacesServiceStatus.OK && results) {
  //           setData({
  //             ...data,
  //             address: target.value,
  //           });
  //           createMarker(results[0]);
  //         }
  //       });
  //     }
  //   } else {
  //     let service = new google.maps.places.PlacesService(map);
  //     service.findPlaceFromQuery(request, (results, status) => {
  //       clearMarker();
  //       if (status === google.maps.places.PlacesServiceStatus.OK && results) {
  //         setData({
  //           ...data,
  //           address: target.value,
  //         });
  //         createMarker(results[0]);
  //       }
  //     });
  //   }
  // };
  const handleGetPositionCurrent = () => {
    clearMarker();
    geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ location: currentPosition })
      .then((response) => {
        if (response.results[0]) {
          const marker = new google.maps.Marker({
            position: currentPosition,
            map: map,
          });
          setMarkers([...markers, marker]);
          map.panTo(currentPosition);
          setData({
            ...data,
            address: response.results[0].formatted_address,
          });
          inputRef.current.value = response.results[0].formatted_address;
          infowindow?.open(map, marker);
        } else {
          window.alert('No results found');
        }
      })
      .catch((error) => window.alert('Geocoder failed due to: ' + error));
  };
  const locationInit = (position) => {
    const curPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    setCurrentPosition(curPosition);
  };

  useEffect(() => {
    // const places = searchBox.getPlaces();
    if (isLoaded) {
      navigator.geolocation.getCurrentPosition(locationInit);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <div className="container" style={{ marginBottom: '20%' }}>
        <div className="row">
          <div className="col-6">
            <h2>Where's your place located?</h2>
            <br />
            <br />
            <Autocomplete>
              <div className="search-map">
                <input
                  label="Full Address"
                  variant="outlined"
                  style={{ height: 50, borderRadius: '10px', width: '522px' }}
                  type="text"
                  name="search-map"
                  placeholder="Enter your address.."
                  id="search-location"
                  onBlur={(event) => handleGetPosition(event)}
                  onKeyDown={(event) => handleGetPosition(event)}
                  onChange={handleChange}
                  ref={inputRef}
                  value={dataAddressStr}
                  disabled
                />
                <button
                  className="current-location"
                  // onClick={handleGetPositionCurrent}
                  onClick={() => setSubmitMap(!submitMap)}
                  style={{
                    height: 50,
                    borderRadius: '10px',
                    marginLeft: '3%',
                  }}
                >
                  <i className="fa-solid fa-location-arrow"></i>
                  Submit
                </button>
              </div>
            </Autocomplete>

            <Box sx={{ minWidth: 120, maxHeight: 50, marginTop: '50px' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={countries[235].name}
                  label="Country"
                  onChange={(e) => handleChangeInput(e, 'country')}
                >
                  {countries.map((country, index) => (
                    <MenuItem
                      value={country.name}
                      key={`${country.name}-${index}`}
                    >
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                minWidth: 120,
                maxWidth: '100%',
                marginTop: '50px',
              }}
            >
              <TextField
                sx={{ borderRadius: '10px' }}
                fullWidth
                onChange={(e) => handleChangeInput(e, 'addressLine')}
                onBlur={(e) => handleChangeInput(e, 'addressLine')}
                label="Address Line"
                id="fullWidth"
              />
            </Box>
            <Box
              sx={{
                minWidth: 120,
                maxWidth: '100%',
                marginTop: '50px',
              }}
            >
              <Stack direction="row" spacing={2}>
                <TextField
                  sx={{ borderRadius: '10px' }}
                  fullWidth
                  label="City"
                  onChange={(e) => handleChangeInput(e, 'city')}
                  onBlur={(e) => handleChangeInput(e, 'city')}
                  id="fullWidth"
                />
                <TextField
                  sx={{ borderRadius: '10px' }}
                  fullWidth
                  label="State"
                  id="fullWidth"
                  onChange={(e) => handleChangeInput(e, 'state')}
                  onBlur={(e) => handleChangeInput(e, 'state')}
                />
              </Stack>
            </Box>
            <Box
              sx={{
                minWidth: 120,
                maxWidth: '100%',
                marginTop: '50px',
              }}
            ></Box>
          </div>
          <div className="col-6">
            <div>
              {isLoaded ? (
                <GoogleMap
                  id="marker-example"
                  mapContainerStyle={containerStyle}
                  zoom={15}
                  center={currentPosition}
                >
                  <Marker onLoad={onLoad} position={currentPosition} />
                </GoogleMap>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="footer-end">
          <ProgressBar variant="dark" now={50} />
          <br />
          <div className="row">
            <div className="col-12">
              <div>
                <Button
                  style={{ background: 'gray' }}
                  onClick={() => navigate('/create-home/1')}
                  variant="contained"
                >
                  Back
                </Button>
                {check ? (
                  <Button
                    style={{
                      marginLeft: '85%',
                      background: '#f7a800',
                    }}
                    Button
                    onClick={() => {
                      handleSetAddress();
                      navigate('/create-home/3');
                    }}
                    variant="contained"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    style={{
                      marginLeft: '85%',
                      background: 'gray',
                    }}
                    Button
                    onClick={() => {
                      handleSetAddress();
                    }}
                    variant="contained"
                    type="button"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
