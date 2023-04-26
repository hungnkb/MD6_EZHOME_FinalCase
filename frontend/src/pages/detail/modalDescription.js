import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Rating } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactHtmlParser from 'react-html-parser';

function ModalDescription(props) {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState();
  const handleCloseModal = () => {setShowModal(false); props.setOpenDescription(false)};
  const handleShowModal = () => setShowModal(true);
  const idHome = useParams();
  const [review, setReview] = useState([]);
  const handleSaveChanges = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (props.openDescription) {
      setShowModal(true);
    }
  }, [props.openDescription]);

  return (
    <>
      <u
        style={{ cursor: 'pointer' }}
        onClick={handleShowModal}
        variant="light"
      >
      </u>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        scrollable={true}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Nội dung của modal */}
          {props.description ? <div>{ReactHtmlParser(props.description)}</div> : null}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDescription;
