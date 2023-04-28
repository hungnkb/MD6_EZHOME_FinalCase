import {
    Button
  } from '@mui/material';
  import ModalCoupon from "./modalCoupon"

export default function Coupon() {
  return (
    <>
      <div style={{marginTop:"3%", marginLeft:"3%"}}>
        <h3 >Store Voucher for the houses</h3>
        <h5 style={{color:"gray"}}>Total 0 discount codes</h5>
        <div className="row">
            <div className="col-12">
                <ModalCoupon/>
            </div>
        </div>
      </div>
    </>
  );
}
