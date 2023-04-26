import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './style.css';
import axios from '../../../api/axios';
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
function ModalGgmap(props) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [libraries] = useState(['places']);
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const mapContainerStyle = {
    height: '800px',
    width: '100%',
  };

  const onLoad = (marker) => {
    console.log('marker: ', marker);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GG_API_LIB_KEY,
    libraries,
  });

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  useEffect(() => {
    const getData = async () => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${props.address}&key=${process.env.REACT_APP_GG_API_LIB_KEY}`,
        )
        .then((res) => {
          const newLocation = { ...location };
          console.log(res, '00000');
          newLocation.lat = res.data.results[0].geometry.location.lat;
          newLocation.lng = res.data.results[0].geometry.location.lng;
          setLocation(newLocation);
        });
    };
    getData();
  }, []);
  return (
    <>
      {values.map((v, idx) => (
        <a
          key={idx}
          className="me-2 mb-2"
          onClick={() => handleShow(v)}
          style={{
            marginLeft: '15px',
            background: 'white',
            color: 'black',
          }}
        >
          {props.address}
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </a>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-3">
              <h2 style={{ marginTop: '10%' }}>Where you will go</h2>
              <a style={{ color: 'black' }}>
                <u>Show the guidebook to the host</u>{' '}
                <i class="fa-regular fa-chevron-right"></i>
              </a>
            </div>
            <div className="col-9">
              {isLoaded && location.lat > 0 && (
                <GoogleMap 
                  id="marker-example"
                  mapContainerStyle={mapContainerStyle}
                  zoom={15}
                  center={location}
                >
                  <Marker onLoad={onLoad} position={location} />
                </GoogleMap>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalGgmap;
