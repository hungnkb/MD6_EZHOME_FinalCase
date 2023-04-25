import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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

function ModalComments(props) {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState();
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleSaveChanges = () => {
    // Xử lý lưu thay đổi
    handleCloseModal();
  };

  return (
    <>
      <Button
        onClick={handleShowModal}
        variant="light"
        style={{ border: '1px solid black' }}
      >
        <b> Show all comment..</b>
      </Button>

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
           Nội dung của modal
          {props.comments.map((data, index) => (
            <div className="d-flex flex-start mb-4">
              <MDBCard className="w-100">
                <MDBCardBody className="p-4">
                  <div>
                    <div className="row">
                      <div className="col-1">
                        <img
                          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                          alt="avatar"
                          style={{
                            width: '150%',
                            height: '60%',
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                      <div className="col-8">
                        <MDBTypography tag="h5">
                          {' '}
                          {data?.idUser.email}
                        </MDBTypography>
                        <p className="small">{data?.createdAt.split('T')[0]}</p>
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
          ))}

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComments;
