import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalImg(props) {
  const image = props.image;
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      {values.map((v, idx) => (
        <Button
          key={idx}
          className="me-2 mb-2"
          onClick={() => handleShow(v)}
          style={{
            border: '1px solid gray',
            position: 'absolute',
            marginLeft: '15px',
            background: 'white',
            borderRadius: '10px',
            color: 'black',
            top: '180px',
          }}
        >
          <i className="fa-brands fa-buromobelexperte"> </i> Show all image..
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <div className="container">
              {image.map((values, index) => (
                <div>
                  <div className="row">
                    <div className="col-12">
                      <img style={{ width: '62%' }} src={values.urlHomeImage} />
                    </div>
                  </div>
                  <br />
                </div>
              ))}
            </div>
          </center>
        </Modal.Body>
      </Modal>
    </>
  );
}
