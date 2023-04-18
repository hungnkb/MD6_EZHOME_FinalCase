import React, { useCallback, useState } from 'react';
import { MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { format } from 'date-fns';
import { Datepicker, localeVi } from '@mobiscroll/react';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { number } from 'yup';
import { loginUser } from '../../service/userAction';
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
  // const [price, setPrice] = useState(null);
  const [data, setData] = useState({
    checkin: null,
    checkout: null,
    // numberOfAdults: 1,
    // numberOfChildrens: 0,
    // numberOfInfants: 0,
  });

  useEffect(() => {
    let newOrderList = [];
    for (let i of props.orders) {
      newOrderList.push({start: i.checkin, end: i.checkout})
    }
    setOrders(newOrderList)
  },[props.orders])

  const onPageLoadingMultiple = useCallback((event) => {
    getBookings(event.firstDay, (bookings) => {
      setMultipleInvalid([bookings.invalid]);
    });
  }, []);
  const handleChange = useCallback((ev) => {
    if (ev.value[0] && ev.value[1]) {
      let dayDiff = Math.round(
          Math.abs(ev.value[0] - ev.value[1]) / (1000 * 60 * 60 * 24),
      );

      let charged = parseInt(dayDiff * Number(props.price));
      setTotal(charged);
      // setTotal({ ...total, totalDay: dayDiff });
      // setOpenDate(false);
    } else if (ev.value[0] || ev.value[1]) {
      setTotal(0)
    } else {
      return
    }
    setDate([ev.value[0], ev.value[1]]);
    setData({
      ...data,
      checkin: format(new Date(ev.value[0]), 'yyyy-MM-dd'),
      checkout: format(new Date(ev.value[1]), 'yyyy-MM-dd'),
    });
  }, [props.price]);

  return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <div className="p-3" style={{ border: '1px solid gray', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <span className="fw-bold">
              {' '}
              <b>{props.price?.toLocaleString('en-EN')}đ </b>
              /night
            </span>
              <hr />
              <div
                  style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div
                    onClick={() => setOpenDate(!openDate)}
                    className="calendar_check_in_out flex mr-10 cursor-pointer"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', }}
                >
                  <div className="row">
                    <div className="col-6">
                      <div className="home-booking-checkinout flex items-center" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="home-booking-content cursor-pointer">
                          <label htmlFor="check-in">
                            <b>Nhận phòng</b>
                          </label>
                          <div className="home-booking-info">
                            {date[0]
                                ? format(new Date(date[0]), 'dd/MM/yyyy')
                                : 'Chọn ngày'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="home-booking-checkinout flex items-center" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="home-booking-content cursor-pointer">
                          <label htmlFor="check-out">
                            {' '}
                            <b> Trả phòng</b>{' '}
                          </label>
                          <div className="home-booking-info">
                            {date[1]
                                ? format(new Date(date[1]), 'dd/MM/yyyy')
                                : 'Chọn ngày'}
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
                        rangeStartLabel="Ngày đến"
                        rangeEndLabel="Ngày trả"
                        locale={localeVi}
                        minRange={1}
                        min={Date.now() + 24 * 60 * 60 * 1000}
                        maxRange={100}
                        width={`200px`}
                        rangeHighlight={true}
                        showRangeLabels={true}
                        controls={['calendar']}
                        invalid={[
                          multipleInvalid,
                          ...orders
                        ]}
                        onPageLoading={onPageLoadingMultiple}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => setOpenDate(!openDate)} variant="warning" style={{ width: 400, marginTop: '10px' }}>
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
  );
}