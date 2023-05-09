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
  MDBCardImage,
} from 'mdb-react-ui-kit';

import { Avatar, Rating, Stack } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';

const socket = io.connect(
  `${process.env.REACT_APP_BASE_URL_SERVER}/notifications`,
);

function ModalComments2(props) {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState();
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const idHome = useParams();
  const [review, setReview] = useState([]);
  const handleSaveChanges = () => {
    // Xử lý lưu thay đổi
    handleCloseModal();
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/v1/reviews?idHome=${idHome.id}`,
      )
      .then((res) => {
        setReview(res.data);
      });
  }, [socket]);
  return (
    <>
      <u
        style={{ cursor: 'pointer' }}
        onClick={handleShowModal}
        variant="light"
      >
        <b> {review.length} comments </b>
      </u>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        scrollable={true}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>All comment...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Nội dung của modal */}
          {review.length <= 0 ? (
            <p style={{ color: 'gray' }}>No comment...</p>
          ) : (
            review.map((data, index) => (
              <div className="d-flex flex-start mb-4">
                <MDBCard className="w-100">
                  <MDBCardBody className="p-4">
                    <div>
                      <div className="row">
                        <div className="col-1">
                          {data.idUser.image ? (
                            <Stack direction="row" spacing={2}>
                              <Avatar
                                alt="img"
                                src={data.idUser.image}
                                sx={{ width: 50, height: 50 }}
                              />
                            </Stack>
                          ) : (
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src="https://tieuhocdongphuongyen.edu.vn/wp-content/uploads/2023/02/1676245765_401_Hinh-anh-Avatar-Trang-Dep-Cho-FB-Zalo-BI-AN.jpg"
                              alt="avatar"
                              width="50"
                              height="50"
                            />
                          )}
                        </div>
                        <div className="col-8">
                          <MDBTypography tag="h5">
                            {' '}
                            {data?.idUser.email}
                          </MDBTypography>
                          <p className="small">
                            {data?.createdAt.split('T')[0]}
                          </p>
                        </div>
                        <div className="col-3">
                          <Rating
                            name="simple-controlled"
                            readOnly
                            defaultValue={data?.rate_stars}
                          />
                        </div>
                      </div>
                      <p>{data?.contents}</p>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComments2;
