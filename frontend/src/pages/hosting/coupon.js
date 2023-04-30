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

export default function Coupon() {
  return (
    <>
      <div style={{ marginTop: '3%', marginLeft: '3%' }}>
        <h3>Store Voucher for the houses</h3>
        <h5 style={{ color: 'gray' }}>Total 0 discount codes</h5>
        <div className="row">
          <div className="col-12">
            <ModalCoupon />
          </div>
        </div>
        <div className='row'> 
        <div className='col-6'>

 <MDBCard >
          <MDBRow className="g-0">
            <MDBCol md="2">
              <MDBCardImage style={{width:"100%"}}
                src="https://cdn-icons-png.flaticon.com/128/612/612803.png"
                alt="..."
                fluid
              />
            </MDBCol>
            <MDBCol md="10">
              <MDBCardBody>
                <MDBCardTitle style={{color:"red"}}>Distcount code date important</MDBCardTitle>
                <MDBCardText>
                  <div className='row'>
                    <div className='col-8'>
                      <p><b>According to %: </b>-30</p>
                      <small className="text-muted">Expiry: 2023/30/04-2023/03/05</small>
                    </div>
                    <div className='col-4'>
                      <Button variant='outlined' type='submit'>Use now</Button>
                      <Button variant='outlined' style={{marginLeft:"6px"}}>Edit</Button>
                    </div>
                  </div>
                  
                </MDBCardText>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
        </div>
        <div className='col-6'>
        <MDBCard >
          <MDBRow className="g-0">
            <MDBCol md="2">
              <MDBCardImage style={{width:"100%"}}
                src="https://cdn-icons-png.flaticon.com/128/612/612803.png"
                alt="..."
                fluid
              />
            </MDBCol>
            <MDBCol md="10">
              <MDBCardBody>
                <MDBCardTitle style={{color:"red"}}>Voucher Holiday</MDBCardTitle>
                <MDBCardText>
                <div className='row'>
                    <div className='col-8'>
                      <p><b>According to %: </b>-30</p>
                      <small className="text-muted">Expiry: 2023/30/04-2023/03/05</small>
                    </div>
                    <div className='col-4'>
                      <Button variant='outlined' type='submit'>Use now</Button>
                      <Button variant='outlined' style={{marginLeft:"6px"}}>Edit</Button>
                    </div>
                  </div>
                </MDBCardText>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
          

        </div>
        </div>
       
      </div>
    </>
  );
}
