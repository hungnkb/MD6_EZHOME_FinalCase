import { Button } from '@mui/material';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import ModalCoupon from './modalCoupon';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Coupon() {
  const [coupon, setCoupon] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3002/api/v1/coupons').then((res) => {
      console.log(res.data, 2);
      setCoupon(res.data);
    });
  }, []);
  return (
    <>
      <div style={{ marginTop: '3%', marginLeft: '3%', marginBottom: '300px' }}>
        <h3>Store Voucher for the houses</h3>
        <h5 style={{ color: 'gray' }}>Total {coupon.length} discount codes</h5>
        <div className="row">
          <div className="col-12">
            <ModalCoupon />
          </div>
        </div>
        <br />
        <div className="row">
          {coupon &&
            coupon.reverse().map((data, index) => (
              <>
                <div className="col-6">
                  <MDBCard>
                    <MDBRow className="g-0">
                      <MDBCol md="2">
                        <MDBCardImage
                          style={{ width: '100%' }}
                          src="https://cdn-icons-png.flaticon.com/128/612/612803.png"
                          alt="..."
                          fluid
                        />
                      </MDBCol>
                      <MDBCol md="10">
                        <MDBCardBody>
                          <MDBCardTitle style={{ color: 'red' }}>
                            {data.couponname}
                          </MDBCardTitle>
                          <MDBCardText>
                            <div className="row">
                              <div className="col-8">
                                <p>
                                  <b>According to : </b><b style={{ color: 'red' }}>-{data.value}%</b> 
                                </p>
                                <small className="text-muted">
                                  Expiry: {data.startDate} / {data.endDate}
                                </small>
                              </div>
                              <div className="col-4">
                                <Button variant="outlined" type="submit">
                                  Delete
                                </Button>
                                <Button
                                  variant="outlined"
                                  style={{ marginLeft: '6px' }}
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </div>
                <br />
              </>
            ))}
        </div>
      </div>
    </>
  );
}
