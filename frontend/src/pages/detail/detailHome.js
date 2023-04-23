import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import * as React from 'react';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import FormPay from '../payment/formPay';
import ModalImg from './modalImg';
// import ModalComments from './modalComments';
import Skeleton from '@mui/material/Skeleton';
import ModalGgmap from './ggmap/modalGgmap';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import Review from './review/review';
import { Modal } from '@mui/material';
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
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
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
  const [idOwner, setIdOwner] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getData = async () => {
      axios
        .get(`http://localhost:3002/api/v1/homes?idHome=${idHome.id}`)
        .then((response) => {
          setImage(response.data[0].images);
          setDetail(response.data[0]);
          setPrice(response.data[0].price);
          setOrders(response.data[0].orders);
          setAddress(response.data[0].address);
          setIdOwner(response.data[0].idUser.idUser);
        });
    };
    getData();
  }, []);
  return (
    <>
      <div>
        <div className="container" style={{ marginTop: '5px' }}>
          <div className="row">
            <div className="col-12">
              <h3> {detail.title} </h3>
              {address && <ModalGgmap address={address} />}
            </div>
          </div>
          <br />
          <div className="d-flex flex-wrap justify-content-center">
            <div>
              <ModalImg image={image} />
              {detail?.images?.length > 0 ? (
                <img
                  style={{ width: 620, height: 400 }}
                  src={detail?.images[0]?.urlHomeImage}
                />
              ) : (
                <Skeleton
                  animation="wave"
                  style={{ width: 600, height: 500 }}
                />
              )}
            </div>
            <div style={{ marginLeft: '1%' }}>
              {detail?.images?.length > 0 ? (
                <img
                  style={{ width: 620, height: 400 }}
                  src={detail?.images[1]?.urlHomeImage}
                />
              ) : (
                <Skeleton
                  animation="wave"
                  style={{ width: 600, height: 500 }}
                />
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-7">
              <h4> What is there where you are staying?</h4>
              <br />
              <Box sx={{ minWidth: 275 }}>
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
                              <BathtubIcon /> Bathrooms: {detail.bathrooms}
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
                              <BedIcon /> Bedrooms: {detail.bedrooms}
                            </center>
                          </Card.Body>
                        </Card>
                      </Card.Body>
                    </div>
                  </div>
                  <br />
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <p>
                          <b>Category :</b>
                          <b
                            style={{
                              color: 'green',
                            }}
                          >
                            {detail.idCategory?.categoryName}
                          </b>
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
              <br />
              <div className="row">
                <div className="col-12">
                  <h4> What is there where you are staying?</h4>
                  <br />
                  <div className="row">
                    <div className="col-6">
                      <p>
                        <i className="fa-solid fa-wifi"></i> Wifi
                      </p>
                      <br />
                      <p>
                        <i className="fa-solid fa-tv"></i> TV
                      </p>
                      <br />
                      <p>
                        <i className="fa-regular fa-snowflake"></i> Air
                        conditioning
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        <i className="fa-solid fa-bed-front"></i> Bed
                      </p>
                      <br />
                      <p>
                        <i className="fa-solid fa-clothes-hanger"></i> Hanger
                      </p>
                      <br />
                      <p>
                        <i className="fa-regular fa-kitchen-set"></i> Kitchen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5" style={{ marginTop: '65px' }}>
              <FormPay
                price={price}
                setFetchData={setFetchData}
                fetchData={fetchData}
                orders={orders}
                idHome={idHome.id}
                address={detail.address}
                idOwner={idOwner}
              />
            </div>
          </div>
          <br />
          <hr />
          <br />
          <Review idHome={idHome.id} />
        </div>
      </div>
    </>
  );
}
