import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBTypography} from "mdb-react-ui-kit";
import {Rating, TextField} from "@mui/material";
import ModalComments from "../modalComments";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

  export default function Review(props){
    const [value,setValue]=useState()
    const [review,setReview]=useState([])
      useEffect(()=>{
          axios.get(`http://localhost:3002/api/v1/reviews?idHome=${props.idHome}`).then((res)=>{
              setReview(res.data)
          })
      },[])
    return (
        <>
            <div className="row">
                <div className="col-1">
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
                <div className="col-11">
                    <h3 style={{marginLeft:"1%"}}>{review.length} comment</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <TextField id="standard-basic" style={{width:"100%"}} label="Comment.." variant="standard" />
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div className="row">
                        <div className="col-11">
                            <Button variant="light" type="submit" style={{ borderRadius:"20px", border:"1px solid black ",marginLeft:"95%"}}>Cancel </Button>
                        </div>
                        <div className="col-1">
                            <Button variant="light" type="submit" style={{ borderRadius:"20px", border:"1px solid black ",marginLeft:"10%"}}>Comment </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <section>
                                <MDBContainer className="py-5" style={{width: "100%" }}>

                                        <MDBCol md="11" lg="12" xl="12">
                                            {review.map((data,index)=> {
                                                if(index<4){
                                                    return (
                                                        <div className="d-flex justify-content-between mb-4">
                                                            <div className="row">
                                                                <div className='group'>
                                                                    <div className="col-9">
                                                                        <div className="row">
                                                                            <div className="col-2">
                                                                                <img
                                                                                    src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                                                                                    alt="avatar"
                                                                                    style={{width: "100%", borderRadius: "50%"}}
                                                                                />
                                                                            </div>
                                                                            <div className="col-10">
                                                                                <MDBTypography tag="h5">  {data?.idUser.email}
                                                                                </MDBTypography>
                                                                                <p className="small"
                                                                                   style={{marginLeft: "10%"}}>{data?.createdAt.split("T")[0]}</p>
                                                                            </div>
                                                                        </div>

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
                                                    )
                                                } else {
                                                    return ""
                                                }
                                            })}
                                            {(review.length>=5) ?  <div className="row">
                                                <div className="col-12">
                                                    <ModalComments comments={review}/>
                                                </div>
                                            </div> : ''}

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