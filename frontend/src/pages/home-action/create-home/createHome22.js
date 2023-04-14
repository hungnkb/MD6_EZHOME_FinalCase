import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../../redux/features/homeSlice';
import './style.css';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const containerStyle = {
  width: '400px',
  height: '400px',
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
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const google = window.google;
  const dispatch = useDispatch();

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

  const handleGetPosition = (event) => {
    let { target } = event;
    let { keyCode } = event;
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
      <div className="container" style={{ marginTop: '50px' }}>
        <div className="row">
          <div className="col-6">
            <h1>Where's your place located?</h1>
            <Autocomplete>
              <div className="search-map">
                <input
                  style={{ height: 50, borderRadius: '10px' }}
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
                    marginLeft: '15px',
                  }}
                >
                  <i className="fa-solid fa-location-arrow"></i>
                  Current position
                </button>
              </div>
            </Autocomplete>
          </div>
          <div className="col-6">
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
        <div className="row">
          <div className="col-12">
            <div style={{ marginTop: '15px' }}>
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
                    marginLeft: '900px',
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
                    marginLeft: '900px',
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
    </>
  );
}
