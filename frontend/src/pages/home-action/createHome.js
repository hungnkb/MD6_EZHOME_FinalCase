import React, { useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { useDropzone } from 'react-dropzone'
// Thông tin nhà bao gồm:
//     - Tên của căn nhà ()
// - Loại phòng (): phòng đơn, phòng đôi, phòng tổng thống, Phòng VIP, phòng Luxury (Selectbox)
// - Địa chỉ ()
// - Số lượng phòng ngủ () :1-10 phòng (select option)
// - Số lượng phòng tắm (): 1-3 phòng (select option)
// - Mô tả chung
// - Giá tiền theo ngày(VNĐ)()
// - Ảnh: nếu không đăng thì có ảnh mặc định . Chỉ cho chọn file jpeg, png.
//     Các trường phải validate.
//     Lưu ý: Thuê là thuê cả căn nhà chứ không thuê từng phòng

export default function CreateHome() {
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState([]);
    const currentState = useSelector(state => state.auth);

    const onDrop = useCallback(acceptedFiles => {
        setImages(images => [...images, ...acceptedFiles]);
    }, [])

    console.log(222, images);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        let title = form.idCategory.value;
        let price = form.price.value;
        let address = form.address.value;
        let bathrooms = form.bathrooms.value;
        let bedrooms = form.bedrooms.value;
        let description = form.description.value;
        let idCategory = form.idCategory.value;
        let file = form.file.value;

        let newHome = await axios.post('http://localhost:3002/api/v1/homes', {
            title, price, address, bathrooms, bedrooms, description, idCategory, file
        })



        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <>
            <Form encType="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" md="4" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name home</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter home"
                        autoFocus required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid price.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" md="4" controlId="exampleForm.ControlInput1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        id='address'
                        type="text"
                        placeholder="Enter address"
                        autoFocus required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid address.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Categories</Form.Label>
                    <Form.Select id='idCategory' aria-label="Default select example">
                        {/*<option disabled>Categories</option>*/}
                        <option value="1">Presidential</option>
                        <option value="2">Single</option>
                        <option value="3">Pair</option>
                        <option value="4">VIP</option>
                        <option value="5">Luxury</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group style={{ width: 200, float: "left", marginLeft: "15px", marginTop: "14px" }}>
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Select id='bedrooms' aria-label="Default select example" >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group style={{ width: 200, float: "left", marginLeft: "15px", marginTop: "14px" }}>
                    <Form.Label>Bathroom</Form.Label>
                    <Form.Select id='bathrooms' aria-label="Default select example">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    className="mb-3"
                // controlId="validationCustom03"
                >
                    <Form.Label>Description</Form.Label>
                    <Form.Control id='description' as="textarea" rows={3} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Description.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Up image</Form.Label>
                    {/* <Form.Control id='file' type="file" multiple repuired />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid price.
                    </Form.Control.Feedback> */}
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                </Form.Group>
                <div style={{display: 'flex', direction: 'ltr'}}>
                    {images.map((image, i) => (
                        <img style={{ width: '150px' }} key={i} src={URL.createObjectURL(image)} />
                    ))}
                </div>

                <Form.Group className="mb-3" md="4" controlId="exampleForm.ControlInput1">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        id='price'
                        placeholder="Enter price"
                        autoFocus required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid price.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="warning">Submit form</Button>
            </Form>
        </>
    )
}