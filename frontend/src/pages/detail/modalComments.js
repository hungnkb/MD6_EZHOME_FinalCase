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

// export default function ModalComments() {
//     const [lgShow, setLgShow] = useState(false);
//     const [value,setValue]= useState();
//     return (
//         <>
//             <Button onClick={() => setLgShow(true)} variant="light"  style={{border:"1px solid black"}}>
//                 <b> Show all comment..</b>
//             </Button>
//             <Modal
//                 size="lg"
//                 show={lgShow}
//                 onHide={() => setLgShow(false)}
//                 aria-labelledby="example-modal-sizes-title-lg"
//                 style={{marginTop:"20px"}}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="example-modal-sizes-title-lg">
//                       All comments
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <section className="vh-100">
//                         <MDBContainer  style={{width: "100%" }}>
//                             <MDBRow className="justify-content-center">
//                                 <MDBCol md="11" lg="12" xl="12">
//                                     <div>
//
//                                         <MDBCard>
//                                             <MDBCardBody>
//                                                 <div>
//                                                     <div className="row">
//                                                         <div className="col-1">
//                                                             <img
//                                                                 src="https://bountycdn.azureedge.net/~/media/b9bedc08353044c5b7e354858f0c4db1.ashx?la=en&rv=26a2b311-b7b5-49bf-8949-d05b6ab5f712"
//                                                                 alt="avatar"
//                                                                 style={{width:"150%",height:"60%", borderRadius:"50%"}}
//                                                             />
//                                                         </div>
//                                                         <div className="col-8">
//                                                             <MDBTypography tag="h5">Johny Cash</MDBTypography>
//                                                             <p className="small">3 hours ago</p>
//                                                         </div>
//                                                         <div className="col-3">
//                                                             <Rating
//                                                                 name="simple-controlled"
//                                                                 value={value}
//                                                                 onChange={(event, newValue) => {
//                                                                     setValue(newValue);
//                                                                 }}
//                                                             />
//                                                         </div>
//                                                     </div>
//
//                                                     <p>
//                                                         Cras sit amet nibh libero, in gravida nulla. Nulla vel
//                                                         metus scelerisque ante sollicitudin. Cras purus odio,
//                                                         vestibulum in vulputate at, tempus viverra turpis. Fusce
//                                                         condimentum nunc ac nisi vulputate fringilla. Donec
//                                                         lacinia congue felis in faucibus ras purus odio,
//                                                         vestibulum in vulputate at, tempus viverra turpis.
//                                                     </p>
//
//                                                 </div>
//                                             </MDBCardBody>
//                                         </MDBCard>
//                                     </div>
//                                     <div className="d-flex flex-start mb-4">
//
//                                         <MDBCard className="w-100">
//                                             <MDBCardBody className="p-4">
//                                                 <div>
//                                                     <div className="row">
//                                                         <div className="col-1">
//                                                             <img
//                                                                 src="https://media.glamour.com/photos/60ec8c044b69168174d4d344/master/w_2560%2Cc_limit/118199090_660701904827587_4866693903082711670_n.jpg"
//                                                                 alt="avatar"
//                                                                 style={{width:"150%",  height:"60%",borderRadius:"50%"}}
//                                                             />
//                                                         </div>
//                                                         <div className="col-8">
//                                                             <MDBTypography tag="h5">Thu Hường</MDBTypography>
//                                                             <p className="small">7 hours ago</p>
//                                                         </div>
//                                                         <div className="col-3">
//                                                             <Rating
//                                                                 name="simple-controlled"
//                                                                 value={value}
//                                                                 onChange={(event, newValue) => {
//                                                                     setValue(newValue);
//                                                                 }}
//                                                             />
//                                                         </div>
//                                                     </div>
//
//                                                     <p>
//                                                         Cras sit amet nibh libero, in gravida nulla. Nulla vel
//                                                         metus scelerisque ante sollicitudin. Cras purus odio,
//                                                         vestibulum in vulputate at, tempus viverra turpis. Fusce
//                                                         condimentum nunc ac nisi vulputate fringilla. Donec
//                                                         lacinia congue felis in faucibus ras purus odio,
//                                                         vestibulum in vulputate at, tempus viverra turpis.
//                                                     </p>
//
//                                                 </div>
//                                             </MDBCardBody>
//                                         </MDBCard>
//                                     </div> <div className="d-flex flex-start mb-4">
//
//                                         <MDBCard className="w-100">
//                                             <MDBCardBody className="p-4">
//                                                 <div>
//                                                     <div className="row">
//                                                         <div className="col-1">
//                                                             <img
//                                                                 src="https://bountycdn.azureedge.net/~/media/b9bedc08353044c5b7e354858f0c4db1.ashx?la=en&rv=26a2b311-b7b5-49bf-8949-d05b6ab5f712"
//                                                                 alt="avatar"
//                                                                 style={{width:"150%",height:"60%", borderRadius:"50%"}}
//                                                             />
//                                                         </div>
//                                                         <div className="col-8">
//                                                             <MDBTypography tag="h5">Johny Cash</MDBTypography>
//                                                             <p className="small">3 hours ago</p>
//                                                         </div>
//                                                         <div className="col-3">
//                                                             <Rating
//                                                                 name="simple-controlled"
//                                                                 value={value}
//                                                                 onChange={(event, newValue) => {
//                                                                     setValue(newValue);
//                                                                 }}
//                                                             />
//                                                         </div>
//                                                     </div>
//
//                                                     <p>
//                                                         Cras sit amet nibh libero, in gravida nulla. Nulla vel
//                                                         metus scelerisque ante sollicitudin. Cras purus odio,
//                                                         vestibulum in vulputate at, tempus viverra turpis. Fusce
//                                                         condimentum nunc ac nisi vulputate fringilla. Donec
//                                                         lacinia congue felis in faucibus ras purus odio,
//                                                         vestibulum in vulputate at, tempus viverra turpis.
//                                                     </p>
//
//                                                 </div>
//                                             </MDBCardBody>
//                                         </MDBCard>
//                                     </div>
//                                     <div className="d-flex flex-start mb-4">
//
//                                         <MDBCard className="w-100">
//                                             <MDBCardBody className="p-4">
//                                                 <div>
//                                                     <div className="row">
//                                                         <div className="col-1">
//                                                             <img
//                                                                 src="https://media.glamour.com/photos/60ec8c044b69168174d4d344/master/w_2560%2Cc_limit/118199090_660701904827587_4866693903082711670_n.jpg"
//                                                                 alt="avatar"
//                                                                 style={{width:"150%",  height:"60%",borderRadius:"50%"}}
//                                                             />
//                                                         </div>
//                                                         <div className="col-8">
//                                                             <MDBTypography tag="h5">Thu Hường</MDBTypography>
//                                                             <p className="small">7 hours ago</p>
//                                                         </div>
//                                                         <div className="col-3">
//                                                             <Rating
//                                                                 name="simple-controlled"
//                                                                 value={value}
//                                                                 onChange={(event, newValue) => {
//                                                                     setValue(newValue);
//                                                                 }}
//                                                             />
//                                                         </div>
//                                                     </div>
//
//                                                     <p>
//                                                         Cras sit amet nibh libero, in gravida nulla. Nulla vel
//                                                         metus scelerisque ante sollicitudin. Cras purus odio,
//                                                         vestibulum in vulputate at, tempus viverra turpis. Fusce
//                                                         condimentum nunc ac nisi vulputate fringilla. Donec
//                                                         lacinia congue felis in faucibus ras purus odio,
//                                                         vestibulum in vulputate at, tempus viverra turpis.
//                                                     </p>
//
//                                                 </div>
//                                             </MDBCardBody>
//                                         </MDBCard>
//                                     </div>
//                                 </MDBCol>
//                             </MDBRow>
//                         </MDBContainer>
//                     </section>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// }
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalComments(props) {
  console.log(props.comments);
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
          {/* Nội dung của modal */}
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
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
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
          {/*<Button variant="secondary" onClick={handleCloseModal}>*/}
          {/*    Close*/}
          {/*</Button>*/}
          {/*<Button variant="primary" onClick={handleSaveChanges}>*/}
          {/*    Save Changes*/}
          {/*</Button>*/}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComments;
