import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Datepicker } from '@mobiscroll/react';
import TextField from '@mui/material/TextField';
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
export default function ModalCoupon() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
        <i class="fa-solid fa-circle-plus"></i> Generate discount code
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
       <center> <h3>    Create  voucher  </h3> </center> 
          <MDBContainer fluid>
            <MDBRow className="d-flex justify-content-center align-items-center">
              <MDBCol lg="12" className="my-5">
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="5" className="ps-5">
                        <h6 className="mb-0"><b> Contents</b></h6>
                      </MDBCol>

                      <MDBCol md="7" className="pe-5">
                        <MDBInput size="lg" id="form1" type="text" />
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />

                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="5" className="ps-5">
                        <h6 className="mb-0"><b>According to % </b> </h6>
                      </MDBCol>

                      <MDBCol md="7" className="pe-5">
                        <MDBInput size="lg" min="0" max="100" id="form2" type="number" />
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />

                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="5" className="ps-5">
                        <h6 className="mb-0"><b> Start date </b></h6>
                      </MDBCol>

                      <MDBCol md="7" className="pe-5">
                        <MDBInput size="lg" id="form2" type="date" />
                      </MDBCol>
                    </MDBRow>
                    <hr className="mx-n3" />

                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="5" className="ps-5">
                        <h6 className="mb-0"><b> End date</b> </h6>
                      </MDBCol>

                      <MDBCol md="7" className="pe-5">
                        <MDBInput size="lg" id="form2" type="date" />
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </DialogContent>
        <DialogActions>
          <Button variant='' style={{background:"gray", color:"white", marginRight:"70%"}} onClick={handleClose}>Cancel</Button>
          <Button variant='warning' style={{background:"#f7a800", color:"white"}} onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
