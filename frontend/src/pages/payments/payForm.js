import React from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRadio,
    MDBRow,
} from "mdb-react-ui-kit";

export default function PayForm() {
    return (
        <MDBContainer fluid className="p-5" style={{ backgroundColor: "#eee" }}>
            <MDBCard>
                <MDBCardBody>
                    <MDBRow className="d-flex justify-content-center pb-5">
                        <MDBCol>
                            {""}
                            <div
                                className="rounded d-flex flex-column p-2"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                <div className="p-2 me-3">
                                    <h5><b>1,200,000đ</b>/night</h5>
                                </div>
                                <div className="p-2 d-flex">
                                    <MDBCol size="8">
                                        //hehe
                                    </MDBCol>
                                    <div className="ms-auto">+ $40.00</div>
                                </div>
                                <div className="border-top px-2 mx-2"></div>
                                <div className="p-2 d-flex pt-3">
                                    <MDBCol size="8">Insurance Responsibility</MDBCol>
                                    <div className="ms-auto">
                                        <b>$71.76</b>
                                    </div>
                                </div>
                                <div className="p-2 d-flex">
                                    <MDBCol size="8">
                                        Patient Balance{" "}
                                        <span className="fa fa-question-circle text-dark"></span>
                                    </MDBCol>
                                    <div className="ms-auto">
                                        <b>$71.76</b>
                                    </div>
                                </div>
                                <div className="border-top px-2 mx-2"></div>
                                <div className="p-2 d-flex pt-3">
                                    <MDBCol size="8">
                                        <b>Total</b>
                                    </MDBCol>
                                    <div className="ms-auto">
                                        <b className="text-success">$85.00</b>
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}