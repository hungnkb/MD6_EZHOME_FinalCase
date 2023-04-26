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
        console.log(res);
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
  sendData();
  const sum=()=>{
    let all = 0;
    for (let i = 0; i < review.length; i++) {

      all+=Number(review[i].rate_stars)
    }
    return Math.round((all*2)/review.length)/2
  }
  return (
    <>
      <div className="row">
        <div className="col-1">
          <Rating name="simple-controlled"   precision={0.5} readOnly value={sum()} />
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
                  {(data.idUser.image)?(
                     <MDBCardImage 
                    className="rounded-circle shadow-1-strong me-3"
                    src={data.idUser.image}
                    alt="avatar"
                    width="60"
                    height="60"
                  />
                  ):(
                      <MDBCardImage 
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvw1lmPDOJqryVsX3imw1Bj4lnajMh7j-oQQ&usqp=CAU"
                    alt="avatar"
                    width="60"
                    height="60"
                  />
                  )}
               
                
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
