import React from "react";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtnGroup,
    MDBBtn,
} from "mdb-react-ui-kit";

export default function FormPay() {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol>
                    <div className="p-3" style={{border:"1px solid #f7a800"}} >
                        <span className="fw-bold">12,000,000đ/night</span>
                        <div className="d-flex justify-content-between mt-2">
                            <span>contracted Price</span> <span>$186.86</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <span>Amount Deductible</span> <span>$0.0</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <span>Coinsurance(0%)</span> <span>+ $0.0</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <span>Copayment </span> <span>+ 40.00</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-2">
              <span className="lh-sm">
                Total Deductible,
                <br />
                Coinsurance and copay
              </span>
                            <span>$40.00</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
              <span className="lh-sm">
                Maximum out-of-pocket <br />
                on insurance policy
              </span>
                            <span>$40.00</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-2">
                            <span>Insurance Responsibility </span> <span>$71.76</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <span>Patient Balance </span> <span>$13.24</span>
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