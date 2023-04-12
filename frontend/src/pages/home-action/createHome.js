import React, {useState} from "react";
import {Form} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
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

export default function CreateHome(){
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Form.Group>
                    <Form.Label>Categories</Form.Label>
                    <Form.Select aria-label="Default select example">
                        {/*<option disabled>Categories</option>*/}
                        <option value="1">Presidential</option>
                        <option value="2">Single</option>
                        <option value="3">Pair</option>
                        <option value="4">VIP</option>
                        <option value="5">Luxury</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group style={{width:200,float:"left", marginLeft:"15px", marginTop:"14px"}}>
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Select aria-label="Default select example" >
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
                <Form.Group style={{width:200,float:"left", marginLeft:"15px", marginTop:"14px"}}>
                    <Form.Label>Bathroom</Form.Label>
                    <Form.Select aria-label="Default select example">
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
                    <Form.Control as="textarea" rows={3} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Description.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Up image</Form.Label>
                    <Form.Control type="file" multiple repuired />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid price.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" md="4" controlId="exampleForm.ControlInput1">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter price"
                        autoFocus required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid price.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit"  variant="warning">Submit form</Button>
            </Form>
        </>
    )
}