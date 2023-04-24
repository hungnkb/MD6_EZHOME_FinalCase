import { Rating, TextField } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ModalComments from '../modalComments'
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const socket = io.connect(
  `${process.env.REACT_APP_BASE_URL_SERVER}/notifications`,
);

export default function Review(props) {
  const [value, setValue] = useState();
  const [review, setReview] = useState([]);
  const [newReview, setNewReview] = useState({
    rate_stars: 0,
    content: '',
    idHome: props.idHome,
    idUser: localStorage.getItem('idUser'),
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/v1/reviews?idHome=${props.idHome}`)
      .then((res) => {
        setReview(res.data);
      });
  }, [socket]);
  const handleChange = (event) => {
    setNewReview({
      ...newReview,
      [event.target.name]: event.target.value,
    });
  };
  const sendData = () => {
    props.parentCallback(review.length);
  }
  sendData()
  return (
    <>
      <div className="row">
        <div className="col-1">
          <Rating name="simple-controlled" value={5} />
        </div>
        <div className="col-11">
          <h3 style={{ marginLeft: '1%' }}>{review.length} comment</h3>
        </div>
      </div>
        <section>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="12">
            <MDBCard className="text-dark" style={{border :"1px solid white"}}>
              {review.reverse().map((data,index)=>{
                 if (index < 4) {
                  return (
                      <MDBCardBody className="p-4">
                <div className="d-flex flex-start">
                  <MDBCardImage 
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                    alt="avatar"
                    width="60"
                    height="60"
                  />
                  <div>
                    <MDBTypography tag="h6" className="fw-bold mb-1">
                    {data?.idUser.email}
                    </MDBTypography>
                    <div className="d-flex align-items-center mb-3">
                      <p className="small">
                      {data?.createdAt.split('T')[0]}
                        <span> <Rating
                                          name="simple-controlled" size="small"
                                          readOnly
                                          defaultValue={data?.rate_stars}
                                        /></span>
                      </p>
                    </div>
                    <p className="mb-0">
                    {data?.contents}
                    </p>
                  </div>
                </div>
              </MDBCardBody>
                  )
                 }else {
                  return '';
                }
              })}
              {review.length >= 5 ? (
                <div className="row">
                  <div className="col-12">
                    <ModalComments comments={review} />
                  </div>
                </div>
              ) : (
                ''
              )}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}

// export default function RecentComments() {
//   return (
//     <section style={{ backgroundColor: "#ad655f" }}>
//       <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
//         <MDBRow className="justify-content-center">
//           <MDBCol md="12" lg="10">
//             <MDBCard className="text-dark">
//                <MDBCardBody className="p-4">
//                 <div className="d-flex flex-start">
//                   <MDBCardImage
//                     className="rounded-circle shadow-1-strong me-3"
//                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
//                     alt="avatar"
//                     width="60"
//                     height="60"
//                   />
//                   <div>
//                     <MDBTypography tag="h6" className="fw-bold mb-1">
//                       Lara Stewart
//                     </MDBTypography>
//                     <div className="d-flex align-items-center mb-3">
//                       <p className="mb-0">
//                         March 15, 2021
//                         <span className="badge bg-success">Approved</span>
//                       </p>
//                       <a href="#!" className="link-muted">
//                         <MDBIcon fas icon="pencil-alt ms-2" />
//                       </a>
//                       <a href="#!" className="text-success">
//                         <MDBIcon fas icon="redo-alt ms-2" />
//                       </a>
//                       <a href="#!" className="link-danger">
//                         <MDBIcon fas icon="heart ms-2" />
//                       </a>
//                     </div>
//                     <p className="mb-0">
//                       Contrary to popular belief, Lorem Ipsum is not simply
//                       random text. It has roots in a piece of classical Latin
//                       literature from 45 BC, making it over 2000 years old.
//                       Richard McClintock, a Latin professor at Hampden-Sydney
//                       College in Virginia, looked up one of the more obscure
//                       Latin words, consectetur, from a Lorem Ipsum passage, and
//                       going through the cites.
//                     </p>
//                   </div>
//                 </div>
//               </MDBCardBody>

//               <hr className="my-0" />
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//   );
// }
