import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

export default function DetailDashboard(props) {
    console.log(props.dashboard, 111111)
    return (
        <>
            <Modal
                size="lg"
                show={props.lgShow}
                onHide={() => props.setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={props?.dashboard?.title}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>address</Form.Label>
                        <Form.Control type="text" value={props?.dashboard?.address}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>category</Form.Label>
                        <Form.Control type="text" value={props?.dashboard?.idCategory.categoryName}/>
                       </Form.Group> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>bathrooms</Form.Label>
                        <Form.Control type="text" value={props?.dashboard?.bathrooms}/>
                       </Form.Group> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>bedrooms</Form.Label>
                        <Form.Control type="text" value={props?.dashboard?.bedrooms}/>
                       </Form.Group> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={props?.dashboard?.price.toLocaleString('en-EN')}/>
                       </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={props?.dashboard?.description}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}


