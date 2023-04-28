import React, { useState, useEffect, useRef } from 'react';
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
    country: 'Viet Nam',
    addressLine: '',
    city: '',
    state: '',
  });
  const [addressStr, setAddressStr] = useState('');
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
    if (data) {
      setCheck(true);
    }
  }, [data]);

  const handleSetAddress = () => {
    if (data) {
      dispatch(setAddress(data.address));
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
    let newAddress = (dataAddress.addressLine || '') + ' ,' + (dataAddress.state || '') + ' ,'
  };

  console.log(dataAddress, 555);

  const handleGetPosition = (event) => {
    let { target } = event;
    let { keyCode } = event;
    console.log(target.value, 113);
    let request = {
      query: target.value,
      fields: ['name', 'geometry'],
    };
    if (event.type === 'keydown') {
      if (keyCode === 13) {
        let service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
          clearMarker();
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setData({
              ...data,
              address: target.value,
            });
            createMarker(results[0]);
          }
        });
      }
    } else {
      let service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, (results, status) => {
        clearMarker();
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setData({
            ...data,
            address: target.value,
          });
          createMarker(results[0]);
        }
      });
    }
  };
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
                <TextField
                  label="Full Address"
                  variant="outlined"
                  style={{ height: 50, borderRadius: '10px', width: '460px' }}
                  type="text"
                  name="search-map"
                  placeholder="Enter your address.."
                  id="search-location"
                  onBlur={(event) => handleGetPosition(event)}
                  onKeyDown={(event) => handleGetPosition(event)}
                  onChange={handleChange}
                  ref={inputRef}
                />
                <button
                  className="current-location"
                  onClick={handleGetPositionCurrent}
                  style={{
                    height: 50,
                    borderRadius: '10px',
                    marginLeft: '3%',
                  }}
                >
                  <i className="fa-solid fa-location-arrow"></i>
                  Current position
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
                  id="fullWidth"
                />
                <TextField
                  sx={{ borderRadius: '10px' }}
                  fullWidth
                  label="State"
                  id="fullWidth"
                  onChange={(e) => handleChangeInput(e, 'state')}
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
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                  onLoad={(map) => setMap(map)}
                ></GoogleMap>
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
