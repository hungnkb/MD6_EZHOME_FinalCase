import Card from 'react-bootstrap/Card';
import CardContent from "@mui/material/CardContent";
import ContentHome from "./contentHome";
import {Link, NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import * as React from "react";
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import FormPay from "../payment/formPay";
// Thông tin nhà bao gồm:
//     - Tên của căn nhà
// - Loại phòng
// - Địa chỉ
// - Số lượng phòng ngủ
// - Số lượng phòng tắm
// - Mô tả chung
// - Giá tiền theo ngày(VNĐ)
// - Ảnh: dạng Slide
// Lưu ý: Thuê là thuê cả căn nhà chứ không thuê từng phòng
const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);
export default function DetailHome() {
    const idHome = useParams();
    console.log(idHome.id, 11)
    const [detail, setDetail] = useState([])
    const [price, setPrice] = useState()
    useEffect(() => {
        axios.get(`http://localhost:3002/api/v1/homes?idHome=${idHome.id}`).then(res => {
            console.log(res);setDetail(res.data[0]); setPrice(res.data[0].price)})
    }, [])
    return (
        <>
            <div>
                <div className="container" style={{marginTop:"50px"}}>
                    <div className="row">
                        <div className="col-12">
                            <h3> {detail.title} </h3>
                            <Link to={"#!"} style={{color: 'black'}}>  {detail.address} - Vietnam </Link>
                        </div>

                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <img style={{width: 500}}
                                 src="https://a0.muscache.com/im/pictures/miso/Hosting-9738315/original/822ef891-8fb6-4695-a31c-485ab7c2ee21.jpeg?im_w=960"/>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <img style={{width: 250}}
                                         src="https://a0.muscache.com/im/pictures/miso/Hosting-9738315/original/a6a87b0d-8854-4631-8797-444f1069f7df.jpeg?im_w=720"/>
                                </div>
                                <div className="col-6">
                                    <img style={{width: 250}}
                                         src="https://a0.muscache.com/im/pictures/a0cb7a6b-06d1-4fad-b856-8bc9e7d5c46c.jpg?im_w=720"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <img style={{width: 250}}
                                         src="https://a0.muscache.com/im/pictures/ff87818d-b407-43dc-b205-79ab0f965ada.jpg?im_w=720"/>
                                </div>
                                <div className="col-6">
                                    <img style={{width: 250}}
                                         src="https://a0.muscache.com/im/pictures/395c1775-d06e-4d84-900e-4cce999bf237.jpg?im_w=720"/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-7">
                            <h4> What is there where you are staying?</h4>
                            <hr/>
                            <Box sx={{minWidth: 275}}>
                                <Card>
                                    <div className="row">
                                        <div className="col-6">
                                            <Card.Body>
                                                <Card style={{
                                                    width: 200,
                                                    height: 70,
                                                    float: "left",
                                                    marginLeft: "100px"
                                                }}>
                                                    <Card.Body>
                                                        <center>
                                                            <BathtubIcon/> Bathrooms: {detail.bathrooms}
                                                        </center>

                                                    </Card.Body>
                                                </Card>
                                            </Card.Body>
                                        </div>
                                        <div className="col-6">
                                            <Card.Body>
                                                <Card style={{width: 200, height: 70, float: "left"}}>
                                                    <Card.Body>
                                                        <center>
                                                            <BedIcon/> Bedrooms: {detail.bedrooms}
                                                        </center>

                                                    </Card.Body>
                                                </Card>
                                            </Card.Body>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <p><b>Category :</b> <b style={{color:"green"}}> {detail.idCategory?.categoryName} </b> </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p><b> Description :</b>{detail.description}</p>
                                            </div>
                                        </div>

                                    </div>

                                </Card>
                            </Box>
                            <hr/>
                            <div className="row">
                                <div className="col-12">
                                    {/*<h4> What is there where you are staying?</h4>*/}
                                    <div className="row">
                                        <div className="col-6">

                                        </div>
                                        <div className="col-6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5" style={{marginTop: "65px"}}>
                            <FormPay price={price}/>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}