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
                <div className="col-6">
                    <div className="row">
                        <div className="col-12">
                            <section className="vh-100">
                                <MDBContainer className="py-5" style={{width: "100%" }}>
                                    <MDBRow className="justify-content-center">
                                        <MDBCol md="11" lg="12" xl="12">
                                            <div className="d-flex flex-start mb-4">

                                                <MDBCard className="w-100">
                                                    <MDBCardBody className="p-4">
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <img
                                                                        src="https://bountycdn.azureedge.net/~/media/b9bedc08353044c5b7e354858f0c4db1.ashx?la=en&rv=26a2b311-b7b5-49bf-8949-d05b6ab5f712"
                                                                        alt="avatar"
                                                                        style={{width:"150%",height:"60%", borderRadius:"50%"}}
                                                                    />
                                                                </div>
                                                                <div className="col-8">
                                                                    <MDBTypography tag="h5">Johny Cash</MDBTypography>
                                                                    <p className="small">3 hours ago</p>
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

                                                            <p>
                                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                                metus scelerisque ante sollicitudin. Cras purus odio,
                                                                vestibulum in vulputate at, tempus viverra turpis. Fusce
                                                                condimentum nunc ac nisi vulputate fringilla. Donec
                                                                lacinia congue felis in faucibus ras purus odio,
                                                                vestibulum in vulputate at, tempus viverra turpis.
                                                            </p>

                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </div>
                                            <div className="d-flex flex-start mb-4">

                                                <MDBCard className="w-100">
                                                    <MDBCardBody className="p-4">
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <img
                                                                        src="https://media.glamour.com/photos/60ec8c044b69168174d4d344/master/w_2560%2Cc_limit/118199090_660701904827587_4866693903082711670_n.jpg"
                                                                        alt="avatar"
                                                                        style={{width:"150%",  height:"60%",borderRadius:"50%"}}
                                                                    />
                                                                </div>
                                                                <div className="col-8">
                                                                    <MDBTypography tag="h5">Thu Hường</MDBTypography>
                                                                    <p className="small">7 hours ago</p>
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

                                                            <p>
                                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                                metus scelerisque ante sollicitudin. Cras purus odio,
                                                                vestibulum in vulputate at, tempus viverra turpis. Fusce
                                                                condimentum nunc ac nisi vulputate fringilla. Donec
                                                                lacinia congue felis in faucibus ras purus odio,
                                                                vestibulum in vulputate at, tempus viverra turpis.
                                                            </p>

                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </div>

                                            <div className="row">
                                                <div className="col-12">
                                                    <ModalComments/>
                                                </div>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </section>
                        </div>
                    </div>

                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-12">
                            <section className="vh-100">
                                <MDBContainer className="py-5" style={{width: "100%" }}>
                                    <MDBRow className="justify-content-center">
                                        <MDBCol md="11" lg="12" xl="12">
                                            <div className="d-flex flex-start mb-4">

                                                <MDBCard className="w-100">
                                                    <MDBCardBody className="p-4">
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <img
                                                                        src="https://bountycdn.azureedge.net/~/media/b9bedc08353044c5b7e354858f0c4db1.ashx?la=en&rv=26a2b311-b7b5-49bf-8949-d05b6ab5f712"
                                                                        alt="avatar"
                                                                        style={{width:"150%",height:"60%", borderRadius:"50%"}}
                                                                    />
                                                                </div>
                                                                <div className="col-8">
                                                                    <MDBTypography tag="h5">Johny Cash</MDBTypography>
                                                                    <p className="small">3 hours ago</p>
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

                                                            <p>
                                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                                metus scelerisque ante sollicitudin. Cras purus odio,
                                                                vestibulum in vulputate at, tempus viverra turpis. Fusce
                                                                condimentum nunc ac nisi vulputate fringilla. Donec
                                                                lacinia congue felis in faucibus ras purus odio,
                                                                vestibulum in vulputate at, tempus viverra turpis.
                                                            </p>

                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </div>
                                            <div className="d-flex flex-start mb-4">

                                                <MDBCard className="w-100">
                                                    <MDBCardBody className="p-4">
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <img
                                                                        src="https://media.glamour.com/photos/60ec8c044b69168174d4d344/master/w_2560%2Cc_limit/118199090_660701904827587_4866693903082711670_n.jpg"
                                                                        alt="avatar"
                                                                        style={{width:"150%",  height:"60%",borderRadius:"50%"}}
                                                                    />
                                                                </div>
                                                                <div className="col-8">
                                                                    <MDBTypography tag="h5">Thu Hường</MDBTypography>
                                                                    <p className="small">7 hours ago</p>
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

                                                            <p>
                                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                                metus scelerisque ante sollicitudin. Cras purus odio,
                                                                vestibulum in vulputate at, tempus viverra turpis. Fusce
                                                                condimentum nunc ac nisi vulputate fringilla. Donec
                                                                lacinia congue felis in faucibus ras purus odio,
                                                                vestibulum in vulputate at, tempus viverra turpis.
                                                            </p>

                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </section>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}