import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./style.css"
 function ModalGgmap(props) {
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
        <a
          key={idx}
          className="me-2 mb-2"
          onClick={() => handleShow(v)}
          style={{
            marginLeft: '15px',
            background: 'white',
            color: 'black'
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
         
                <div className='row'>
                    <div className='col-3'>
                        
                               <h2 style={{marginTop:"10%"}}>Where you will go</h2>
                               <a style={{color:"black"}}><u>Show the guidebook to the host</u> <i class="fa-regular fa-chevron-right"></i></a>
                        
                     

                    </div>
                    <div className='col-9'>
                        <img style={{width:"100%"}}  src="https://s3.cloud.cmctelecom.vn/tinhte2/2020/02/4912587_cover_Google_Maps_HCMC_.jpg" alt='ggmap'/>

                    </div>

                </div>
         
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalGgmap;
