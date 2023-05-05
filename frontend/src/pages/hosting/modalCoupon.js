import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './modalCoupon.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ModalCoupon({ setIsFetchCouponList }) {
  const [open, setOpen] = React.useState(false);
  const [newDataCoupon, setNewDataCoupon] = useState({
    couponame: '',
    value: '',
    endDate: '',
    startDate: '',
  });
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      couponame: '',
      startDate: '',
      endDate: '',
      value: 0,
    },
    validationSchema: Yup.object({
      couponame: Yup.string().required('Required'),
      value: Yup.number()
        .min(1, 'Must be greater than 1%')
        .max(100, 'Must be less than 100% ')
        .required('Required'),
      startDate: Yup.date().required('Required'),
      endDate: Yup.date()
        .min(Yup.ref('startDate'), "End date can't be before Start date")
        .required('Required'),
    }),
    onSubmit: (values) => {
      axios
        .post('http://localhost:3002/api/v1/coupons', {
          couponname: values.couponame,
          startDate: values.startDate,
          endDate: values.endDate,
          value: values.value,
          user: localStorage.getItem('idUser'),
          createDate: formattedToday,
        })
        .then(() => {
          setIsFetchCouponList[1](!setIsFetchCouponList[0]);
        });
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{
          color: 'black',
          background: 'white',
          border: '1px solid black',
          borderRadius: '30px',
          marginLeft: '80%',
        }}
        variant="light"
      >
        <i class="fa-solid fa-circle-plus"></i> Generate Voucher
      </Button>

      <Dialog
        id="modal-coupon-create"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <center>
              <h3> Create voucher </h3>
            </center>
            <MDBContainer fluid>
              <MDBRow className="d-flex justify-content-center align-items-center">
                <MDBCol lg="12" className="my-5">
                  <MDBCard>
                    <MDBCardBody className="px-4">
                      <MDBRow className="align-items-center pt-4 pb-3">
                        <MDBCol md="5" className="ps-5">
                          <h6 className="mb-0">
                            <b> Contents</b>
                          </h6>
                        </MDBCol>

                        <MDBCol md="7" className="pe-5">
                          <textarea
                            className="form-control"
                            size="lg"
                            id="couponame"
                            type="textarea"
                            name="couponame"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.couponame}
                          />
                          {formik.touched.couponame &&
                          formik.errors.couponame ? (
                            <div style={{ color: 'red' }}>
                              {formik.errors.couponame}
                            </div>
                          ) : null}
                        </MDBCol>
                      </MDBRow>

                      <hr className="mx-n3" />

                      <MDBRow className="align-items-center pt-4 pb-3">
                        <MDBCol md="5" className="ps-5">
                          <h6 className="mb-0">
                            <b>According to % </b>
                          </h6>
                        </MDBCol>

                        <MDBCol md="7" className="pe-5">
                          <MDBInput
                            size="lg"
                            min="0"
                            max="100"
                            id="value"
                            type="number"
                            name="value"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.value}
                          />
                          {formik.touched.value && formik.errors.value ? (
                            <div style={{ color: 'red' }}>
                              {formik.errors.value}
                            </div>
                          ) : null}
                        </MDBCol>
                      </MDBRow>

                      <hr className="mx-n3" />

                      <MDBRow className="align-items-center pt-4 pb-3">
                        <MDBCol md="5" className="ps-5">
                          <h6 className="mb-0">
                            <b> Start date </b>
                          </h6>
                        </MDBCol>

                        <MDBCol md="7" className="pe-5">
                          <MDBInput
                            size="lg"
                            id="startDate"
                            type="date"
                            name="startDate"
                            onBlur={formik.handleBlur}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={formik.handleChange}
                            value={formik.values.startDate}
                          />
                          {formik.touched.startDate &&
                          formik.errors.startDate ? (
                            <div style={{ color: 'red' }}>
                              {formik.errors.startDate}
                            </div>
                          ) : null}
                        </MDBCol>
                      </MDBRow>
                      <hr className="mx-n3" />

                      <MDBRow className="align-items-center pt-4 pb-3">
                        <MDBCol md="5" className="ps-5">
                          <h6 className="mb-0">
                            <b> End date</b>
                          </h6>
                        </MDBCol>

                        <MDBCol md="7" className="pe-5">
                          <MDBInput
                            size="lg"
                            id="endDate"
                            type="date"
                            name="endDate"
                            min={new Date().toISOString().split('T')[0]}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.endDate}
                          />
                          {formik.touched.endDate && formik.errors.endDate ? (
                            <div style={{ color: 'red' }}>
                              {formik.errors.endDate}
                            </div>
                          ) : null}
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </DialogContent>
          <DialogActions>
            <Button
              variant=""
              style={{ background: 'gray', color: 'white', marginRight: '70%' }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="warning"
              style={{ background: '#f7a800', color: 'white' }}
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
