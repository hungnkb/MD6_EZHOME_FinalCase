import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import ModalComments2 from './modalComments2';
import * as React from 'react';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import FormPay from '../payment/formPay';
import ModalImg from './modalImg';
import Skeleton from '@mui/material/Skeleton';
import ModalGgmap from './ggmap/modalGgmap';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import Review from './review/review';
import ModalDescription from './modalDescription';
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
  const [message, setMessage] = useState('');
  const [descriptionPart, setDescriptionPart] = useState('');
  const [openDescription, setOpenDescription] = useState(false);
  const [valueCoupon, setVaueCoupon] = useState(null)
  const callbackFunction = (childData) => {
    setMessage(childData);
  };
  useEffect(() => {
    const getData = async () => {
      axios
        .get(`http://localhost:3002/api/v1/homes?idHome=${idHome.id}`)
        .then((response) => {
          console.log(response.data[0],33)
          if(response.data[0].idCoupon){
            const currentDate = new Date();
            const startDate = new Date(Date.parse(response.data[0].idCoupon.startDate));
            const endDate = new Date(Date.parse(response.data[0].idCoupon.endDate));
            if ((currentDate >= startDate  && currentDate <= endDate && response.data[0].idCoupon.isDeleted === false)){
              setVaueCoupon(response.data[0].idCoupon.value)
            }
          }
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

  useEffect(() => {
    if (detail.description) {
      if (detail.description.split(' ').length > 100) {
        setDescriptionPart(
          detail.description.split(' ').slice(0, 100).join(' '),
        );
      }
    }
  }, [detail]);

  return (
    <>
      <div className="container">
        <div style={{ marginTop: '5px' }}>
          <div className="row">
            <div className="col-12">
              <h3> {detail.title} </h3>
              <ModalComments2 /> {address && <ModalGgmap address={address} />}
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
                          <div> {ReactHtmlParser(descriptionPart)}</div>
                          {descriptionPart && (
                            <div
                              style={{ cursor: 'pointer' }}
                              onClick={() => setOpenDescription(true)}
                            >
                              <b> See more . . . </b>
                            </div>
                          )}
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
                valueCoupon={valueCoupon}
              />
            </div>
          </div>
          <br />
          <hr />
          <br />
          <Review
            idHome={idHome.id}
            idOwner={idOwner}
            parentCallback={callbackFunction}
          />
        </div>
      </div>
      {descriptionPart && (
        <ModalDescription
          description={detail.description}
          openDescription={openDescription}
          setOpenDescription={setOpenDescription}
        />
      )}
    </>
  );
}
