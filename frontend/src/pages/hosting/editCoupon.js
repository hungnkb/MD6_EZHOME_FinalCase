import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Datepicker } from '@mobiscroll/react';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';

export default function EditCoupon() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Tooltip title="edit" arrow>
             <IconButton  onClick={handleClickOpen} style={{ marginLeft: '6px' }}>
      <i class="fa-solid fa-pen-to-square"></i>
      </IconButton>
        </Tooltip>
     
      <form 
    //   onSubmit={handleSubmit}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <center>
              <h3> Edit voucher </h3>
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
                          <MDBInput
                            size="lg"
                            id="form1"
                            type="text"
                            name="couponame"
                            //   onChange={handleChange}
                          />
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
                            id="form2"
                            type="number"
                            name="value"
                          />
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
                            id="form2"
                            type="date"
                            name="startDate"
                          />
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
                            id="form2"
                            type="date"
                            name="endDate"
                          />
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
              onClick={handleClose}
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
