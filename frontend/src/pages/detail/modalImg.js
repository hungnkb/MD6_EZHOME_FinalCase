import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalImg() {
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <>
            {values.map((v, idx) => (
                <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)} style={{
                    border: "1px solid gray",
                    position: "absolute",
                    marginLeft: "15px",
                    background: "white",
                    borderRadius: "10px",
                    color: "black",
                    top: "180px"
                }}>
                    <i className="fa-brands fa-buromobelexperte"> </i> Show all image..
                    {typeof v === 'string' && `below ${v.split('-')[0]}`}
                </Button>
            ))}
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <img style={{width: "62%"}}
                                         src="https://a0.muscache.com/im/pictures/miso/Hosting-9738315/original/a6a87b0d-8854-4631-8797-444f1069f7df.jpeg?im_w=720"
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-12">
                                    <img style={{width: "62%"}}
                                         src="https://a0.muscache.com/im/pictures/a0cb7a6b-06d1-4fad-b856-8bc9e7d5c46c.jpg?im_w=720"
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-12">
                                    <img style={{width: "62%"}}
                                         src="https://a0.muscache.com/im/pictures/ff87818d-b407-43dc-b205-79ab0f962ada.jpg?im_w=720"
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-12">
                                    <img style={{width: "62%"}}
                                         src="https://a0.muscache.com/im/pictures/395c1775-d06e-4d84-900e-4cce999bf237.jpg?im_w=720"
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-12">
                                    <img style={{width: "62%"}}
                                         src="https://a0.muscache.com/im/pictures/miso/Hosting-564873855309490515/original/2a8641f7-5c8d-4012-aa1b-85116c21e400.jpeg?im_w=960"
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-12">
                                    <img style={{width: "62%"}}
                                         src="https://a0.muscache.com/im/pictures/miso/Hosting-845746412116984685/original/56f6618a-d8ba-4254-a7ce-5864d204d6f0.jpeg?im_w=1200"
                                    />
                                </div>
                            </div>
                        </div>
                    </center>


                </Modal.Body>
            </Modal>
        </>
    );
}
