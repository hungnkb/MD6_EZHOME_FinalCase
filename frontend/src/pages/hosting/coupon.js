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
import EditCoupon from './editCoupon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';

export default function Coupon() {
  const [coupon, setCoupon] = useState([]);
  const [isFetchCouponList, setIsFetchCouponList] = useState(false);
  const currentAuth = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/coupons?idUser=${currentAuth.userLogin.sub}`,
      )
      .then((res) => {
        let newListCoupons = [];
        for (let i of res.data) {
          if (!i.isDeleted) {
            newListCoupons.push(i);
          }
        }
        setCoupon(newListCoupons);
      });
  }, [isFetchCouponList]);

  const remove = (index) => {
    const idCoupon = coupon[0].idCoupon;
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/coupons?idCoupon=${idCoupon}`)
      .then(() => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#f7a800',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success',
            ).then(() => {
              setIsFetchCouponList(!isFetchCouponList);
            });
          }
        });
      });
  };
  console.log(coupon, 9999);
  return (
    <>
      <div style={{ marginTop: '3%', marginLeft: '3%', marginBottom: '420px' }}>
        <h3>Store Voucher for the houses</h3>
        <h5 style={{ color: 'gray' }}>Total {coupon.length} Voucher</h5>
        <div className="row">
          <div className="col-12">
            <ModalCoupon
              setIsFetchCouponList={[isFetchCouponList, setIsFetchCouponList]}
            />
          </div>
        </div>
        <br />
        <div className="row">
          {coupon &&
            coupon.map((data, index) => (
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
                          <div className="row">
                            <div className="col-8">
                              <MDBCardTitle style={{ color: 'red' }}>
                                {data.couponname}
                              </MDBCardTitle>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col-6">
                                  <Tooltip title="delete" arrow>
                                    <IconButton
                                      variant="outlined"
                                      type="submit"
                                      style={{ marginLeft: '70%' }}
                                      onClick={() => remove(index)}
                                    >
                                      <i className="fa-solid fa-delete-left"></i>
                                    </IconButton>
                                  </Tooltip>
                                </div>
                                <div className="col-6">
                                  <EditCoupon
                                    data={data}
                                    isFetchData={[
                                      isFetchCouponList,
                                      setIsFetchCouponList,
                                    ]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <MDBCardText>
                            <div className="row">
                              <div className="col-8">
                                <p>
                                  <b>According to : </b>
                                  <b style={{ color: 'red' }}>-{data.value}%</b>
                                </p>
                                <small className="text-muted">
                                  Expiry: {data.startDate} / {data.endDate}
                                </small>
                              </div>
                              <div className="col-4">
                                {/* <Tooltip title="Apply Voucher for house rent">
                                <Button variant='contained' color="error">Apply Voucher</Button>
                              </Tooltip> */}
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
