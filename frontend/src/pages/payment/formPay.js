import React, { useCallback, useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtnGroup,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { format } from 'date-fns';
import { Datepicker, localeVi } from '@mobiscroll/react';
import Button from 'react-bootstrap/Button';
const getBookings = (date, callback) => {
  const invalid = [];
  const labels = [];
};
export default function FormPay(props) {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([]);
  const [multipleInvalid, setMultipleInvalid] = React.useState([]);
  const [data, setData] = useState({
    checkin: null,
    checkout: null,
    // numberOfAdults: 1,
    // numberOfChildrens: 0,
    // numberOfInfants: 0,
  });

  const onPageLoadingMultiple = React.useCallback((event) => {
    getBookings(event.firstDay, (bookings) => {
      setMultipleInvalid(bookings.invalid);
    });
  }, []);
  const handleChange = useCallback((ev) => {
    if (ev.value[0] && ev.value[1]) {
      let dayDiff = Math.round(
        Math.abs(ev.value[0] - ev.value[1]) / (1000 * 60 * 60 * 24),
      );
      // setTotal({ ...total, totalDay: dayDiff });
      // setOpenDate(false);
    }
    setDate([ev.value[0], ev.value[1]]);
    setData({
      ...data,
      checkin: format(new Date(ev.value[0]), 'yyyy-MM-dd'),
      checkout: format(new Date(ev.value[1]), 'yyyy-MM-dd'),
    });
  }, []);

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <div className="p-3" style={{ border: '1px solid gray' }}>
            <span className="fw-bold">
              {' '}
              <b>{props.price?.toLocaleString('en-EN')}đ </b>/night
            </span>
            <hr />
            <div
              className="d-flex justify-content-between mt-2"
              style={{ marginLeft: '40px' }}
            >
              <div
                onClick={() => setOpenDate(!openDate)}
                className="calendar_check_in_out flex mr-10 cursor-pointer"
                style={{ width: '100%' }}
              >
                <div className="row">
                  <div className="col-6">
                    <div className="home-booking-checkinout flex items-center">
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
                    <div className="home-booking-checkinout flex items-center">
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
                    minRange={3}
                    maxRange={10}
                    width={`200px`}
                    rangeHighlight={true}
                    showRangeLabels={true}
                    controls={['calendar']}
                    invalid={multipleInvalid}
                    onPageLoading={onPageLoadingMultiple}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <Button variant="warning" style={{ width: 400 }}>
                Reserve
              </Button>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-2">
              <span>Total </span> <span class="text-success">$85.00</span>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
