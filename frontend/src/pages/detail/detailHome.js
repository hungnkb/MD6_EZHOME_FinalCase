import Card from 'react-bootstrap/Card';
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import * as React from 'react';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import FormPay from '../payment/formPay';
import ModalImg from './modalImg';
import Skeleton from '@mui/material/Skeleton';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import {Rating, Typography} from "@mui/material";
import Button from "react-bootstrap/Button";
import ModalComments from "./modalComments";
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
    const [detail, setDetail] = useState([]);
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState([]);
    const [fetchData, setFetchData] = useState(false);
    const [orders, setOrders] = useState([]);
    const [value,setValue]= useState();

    useEffect(() => {
        const getData = async () => {
            axios.get(`http://localhost:3002/api/v1/homes?idHome=${idHome.id}`)
                .then(response => {
                    setImage(response.data[0].images);
                    setDetail(response.data[0]);
                    setPrice(response.data[0].price);
                    setOrders(response.data[0].orders);
                })
        }
        getData()
    }, []);

    return (
        <>
            <div>

                <div className="container" style={{marginTop: '5px'}}>
                    <div className="row">
                        <div className="col-12">
                            <h3> {detail.title} </h3>
                            <Link to={'#!'} style={{color: 'black'}}>
                                {' '}
                                {detail.address}{' '}
                            </Link>
                        </div>
                    </div>
                    <br/>
                    <div className="d-flex flex-wrap justify-content-center">
                        <div>
                            <ModalImg image={image}/>
                            {detail?.images?.length > 0 ? (<img
                                style={{width: 500, height: 400}}
                                src={detail?.images[0]?.urlHomeImage}
                            />) : (<Skeleton animation="wave" style={{width: 500, height: 400}}/>)}

                        </div>
                        <div style={{marginLeft: "5%"}}>
                            {detail?.images?.length > 0 ? (<img
                                style={{width: 500, height: 400}}
                                src={detail?.images[1]?.urlHomeImage}
                            />) : (<Skeleton animation="wave" style={{width: 500, height: 400}}/>)}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-7">
                            <h4> What is there where you are staying?</h4>
                            <br/>
                            <Box sx={{minWidth: 275}}>
                                <Card>
                                    <div className="row">
                                        <div className="col-6">
                                            <Card.Body>
                                                <Card
                                                    style={{
                                                        width: 200,
                                                        height: 70,
                                                        float: 'left',
                                                        marginLeft: '100px',
                                                    }}
                                                >
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
                                                <Card
                                                    style={{
                                                        width: 200,
                                                        height: 70,
                                                        float: 'left',
                                                    }}
                                                >
                                                    <Card.Body>
                                                        <center>
                                                            <BedIcon/> Bedrooms: {detail.bedrooms}
                                                        </center>
                                                    </Card.Body>
                                                </Card>
                                            </Card.Body>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <p>
                                                    <b>Category :</b>{' '}
                                                    <b
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    >
                                                        {' '}
                                                        {detail.idCategory?.categoryName}{' '}
                                                    </b>{' '}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p>
                                                    <b> Description :</b>
                                                    <div>{ReactHtmlParser(detail.description)}</div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Box>
                            <br/>
                            <div className="row">
                                <div className="col-12">
                                    <h4> What is there where you are staying?</h4>
                                    <br/>
                                    <div className="row">
                                        <div className="col-6">
                                            <p>
                                                <i className="fa-solid fa-wifi"></i> Wifi{' '}
                                            </p>
                                            <br/>
                                            <p>
                                                <i className="fa-solid fa-tv"></i> TV{' '}
                                            </p>
                                            <br/>
                                            <p>
                                                <i className="fa-regular fa-snowflake"></i> Air
                                                conditioning{' '}
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <p>
                                                <i className="fa-solid fa-bed-front"></i> Bed{' '}
                                            </p>
                                            <br/>
                                            <p>
                                                <i className="fa-solid fa-clothes-hanger"></i> Hanger{' '}
                                            </p>
                                            <br/>
                                            <p>
                                                <i className="fa-regular fa-kitchen-set"></i> Kitchen{' '}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5" style={{marginTop: '65px'}}>
                            <FormPay price={price} setFetchData={setFetchData} fetchData={fetchData} orders={orders}/>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                    <br/>
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
                            <h3 style={{marginLeft:"1%"}}>32 comments</h3>
                        </div>
                    </div>
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


                </div>
            </div>
        </>
    );
}
