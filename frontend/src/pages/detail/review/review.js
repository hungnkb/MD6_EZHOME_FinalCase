import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBTypography} from "mdb-react-ui-kit";
import {Rating} from "@mui/material";
import ModalComments from "../modalComments";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

  export default function Review(){
    const [value,setValue]=useState()
    const [review,setReview]=useState([])
      useEffect(()=>{
          axios.get('http://localhost:3002/api/v1/reviews').then((res)=>{
              setReview(res.data)
          })
      },[])
      console.log(review)
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <section className="vh-100">
                                <MDBContainer className="py-5" style={{width: "100%" }}>

                                        <MDBCol md="11" lg="12" xl="12">
                                            {review.map(data=>(
                                                <div className="d-flex justify-content-between mb-4">

                                                        <div className="row">
                                                            <div className='group'>
                                                                <div className="col-9">
                                                                    <MDBTypography tag="h5">  <img
                                                                        src="https://bountycdn.azureedge.net/~/media/b9bedc08353044c5b7e354858f0c4db1.ashx?la=en&rv=26a2b311-b7b5-49bf-8949-d05b6ab5f712"
                                                                        alt="avatar"
                                                                        style={{width:"10%", borderRadius:"50%"}}
                                                                    /> {data?.idUser.email}</MDBTypography>
                                                                    {/*<p className="small">3 hours ago</p>*/}
                                                                </div>
                                                            </div>
                                                            <p>
                                                                {data?.contents}
                                                            </p>
                                                        </div>
                                                    <div className="col-3" style={{textAlign: 'right'}}>
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={value}
                                                            onChange={(event, newValue) => {
                                                                setValue(newValue);
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            ))}

                                            <div className="row">
                                                <div className="col-12">
                                                    <ModalComments/>
                                                </div>
                                            </div>
                                        </MDBCol>
                                </MDBContainer>
                            </section>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}