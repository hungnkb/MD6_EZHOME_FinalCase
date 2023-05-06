import React, { useCallback, useState } from 'react';
import { MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { format } from 'date-fns';
import { Datepicker, localeVi } from '@mobiscroll/react';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import LoginModal from '../../components/user/LoginModal';
import ModalFormPay from './modalFormPay';

const getBookings = (date, callback) => {
  const invalid = [];
  const labels = [];
};
export default function FormPay(props) {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([]);
  const [multipleInvalid, setMultipleInvalid] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(null);
  const [oldPrice, setOldPrice] = useState(null)
  const [orderTime, setOrderTime] = useState({});
  const [openLogin, setOpenLogin] = useState(false);
  const [isFormPayOpen, setIsFormPayOpen] = useState(false);
  const [dataForm, setDataForm] = useState({
    checkin: null,
    checkout: null,
  });
  const [openBill, setOpenBill] = useState(false);
  const [data, setData] = useState({});

  const currentAuth = useSelector((state) => state.auth);
  useEffect(() => {
    let newOrderList = [];
    for (let i of props.orders) {
      newOrderList.push({ start: i.checkin, end: i.checkout });
    }
    setOrders(newOrderList);
  }, [props.orders]);

  const onPageLoadingMultiple = useCallback((event) => {
    getBookings(event.firstDay, (bookings) => {
      setMultipleInvalid([bookings.invalid]);
    });
  }, []);
  const handleChange = useCallback(
    (ev) => {
      if (ev.value[0] && ev.value[1]) {
        setOrderTime({ checkin: ev.value[0], checkout: ev.value[1] });
        let dayDiff = Math.round(
          Math.abs(ev.value[0] - ev.value[1]) / (1000 * 60 * 60 * 24),
        );
        console.log(dayDiff)

        let charged = () => {
          if (props.valueCoupon){
            setOldPrice(parseInt(dayDiff * Number(props.price)))
            return parseInt((dayDiff * Number(props.price) - (dayDiff * Number(props.price) * props.valueCoupon / 100)));
          } else {
            return parseInt(dayDiff * Number(props.price));
          }
        }
        setTotal(charged);
      } else if (ev.value[0] || ev.value[1]) {
        setTotal(0);
      } else {
        return;
      }
      setDate([ev.value[0], ev.value[1]]);
      setData({
        ...data,
        checkin: format(new Date(ev.value[0]), 'yyyy-MM-dd'),
        checkout: format(new Date(ev.value[1]), 'yyyy-MM-dd'),
      });
    },
    [props.price],
  );

  const handleBook = () => {
    if (currentAuth.isLogined) {
      if (data.checkin && data.checkout) {
        setDataForm({
          checkin: data.checkin,
          checkout: data.checkout,
          idUser: currentAuth.userLogin.sub,
          idHome: props.idHome,
          charged: total,
        });
        setOpenBill(true);
        setIsFormPayOpen(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please pick date!',
          timer: 1500,
        });
      }
    } else {
      setOpenLogin(true);
    }
  };
  return (
    <>
      <LoginModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
      {isFormPayOpen && (
        <ModalFormPay
          dataForm={dataForm}
          openBill={openBill}
          setOpenBill={setOpenBill}
          idOwner={props.idOwner}
          setIsFormPayOpen={setIsFormPayOpen}
          valueCoupon={props.valueCoupon}
          oldPrice={oldPrice}
        />
      )}
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <div
              className="p-3"
              style={{
                border: '1px solid gray',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div className="row">
                <div className="col-10">
                  <span className="fw-bold">
                    <b>{props.price?.toLocaleString('en-EN')}đ </b>
                    /night
                  </span>
                </div>
                {props.valueCoupon ?
                    <div className="col-2">
                      <b style={{ color: 'red' }}>-{props.valueCoupon}%</b>
                    </div>
                    : null
                }
              </div>

              <hr />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  onClick={() => setOpenDate(!openDate)}
                  className="calendar_check_in_out flex mr-10 cursor-pointer"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <div className="row">
                    <div className="col-6">
                      <div
                        className="home-booking-checkinout flex items-center"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div className="home-booking-content cursor-pointer">
                          <label htmlFor="check-in">
                            <b>Checkin</b>
                          </label>
                          <div className="home-booking-info">
                            {date[0]
                              ? format(new Date(date[0]), 'dd/MM/yyyy')
                              : 'Choose date'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="home-booking-checkinout flex items-center"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div className="home-booking-content cursor-pointer">
                          <label htmlFor="check-out">
                            {' '}
                            <b> Checkout</b>{' '}
                          </label>
                          <div className="home-booking-info">
                            {date[1]
                              ? format(new Date(date[1]), 'dd/MM/yyyy')
                              : 'Choose date'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={(event) => event.stopPropagation()}
                    className={`calendar-range ${openDate ? '' : 'hidden'}`}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Datepicker
                      theme="ios"
                      themeVariant="light"
                      dateFormat="DD-MM-YYYY"
                      select="range"
                      display="inline"
                      touchUi={false}
                      value={date}
                      onChange={handleChange}
                      rangeStartLabel="Arrival date"
                      rangeEndLabel="Pay date"
                      locale={localeVi}
                      minRange={1}
                      min={Date.now() + 24 * 60 * 60 * 1000}
                      maxRange={100}
                      width={`200px`}
                      rangeHighlight={true}
                      showRangeLabels={true}
                      controls={['calendar']}
                      invalid={[multipleInvalid, ...orders]}
                      onPageLoading={onPageLoadingMultiple}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => {
                    let checkCheckout = new Date(data.checkout);
                    if (data.checkout == null || checkCheckout < Date.now()) {
                      Swal.fire('Checkout date is required!');
                    } else {
                      setOpenDate(!openDate);
                      handleBook();
                    }
                  }}
                  variant="warning"
                  style={{ width: 400, marginTop: '10px' }}
                >
                  Book now
                </Button>
              </div>
              <hr />
              {total > 0 ? (
                <div className="d-flex justify-content-between mt-2">
                  <span>
                    {' '}
                    <b> Total</b>{' '}
                  </span>{' '}
                  <span className="text-success">
                    {' '}
                    <b> đ{total?.toLocaleString('en-EN')}</b>{' '}
                  </span>
                </div>
              ) : null}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
