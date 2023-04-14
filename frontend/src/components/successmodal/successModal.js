import style from './SuccessModal.module.css';
import React, { useState } from 'react';
import { MDBModal } from 'mdb-react-ui-kit';

export default function SuccessModal() {
  return (
    <div className="ComponentOne">
      <button
        type="button"
        className="btn btn-info btn-lg"
        data-toggle="modal"
        data-target="#success_tic"
      >
        Open Modal
      </button>
      <MDBModal
        show={true}
        id="success_tic"
        className="modal fade"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <a className="close" href="#" data-dismiss="modal">
              &times;
            </a>
            <div className="page-body">
              <div className="head">
                <h3 style={{ marginTop: '5px' }}>Lorem ipsum dolor sit amet</h3>
                <h4>Lorem ipsum dolor sit amet</h4>
              </div>
              <h1 style={{ textAlign: 'center' }}>
                <div className="checkmark-circle">
                  <div className="background"></div>
                  <div className="checkmark draw"></div>
                </div>
              </h1>
            </div>
          </div>
        </div>
      </MDBModal>
    </div>
  );
}
