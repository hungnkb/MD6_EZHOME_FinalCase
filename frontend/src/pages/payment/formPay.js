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
                    <div className="p-3" style={{border:"1px solid gray"}} >
                        <span className="fw-bold">12,000,000đ/night</span>
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