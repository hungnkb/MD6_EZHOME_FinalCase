import React from 'react';
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import './footer.css';
export default class Footer extends React.Component {
  render() {
    return (
      <MDBFooter bgColor="light" className="text-center text-lg-left">
        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          &copy; {new Date().getFullYear()} Copyright:
          <NavLink className="text-dark" href="http://localhost:3000">
            EZHOME
          </NavLink>
        </div>
      </MDBFooter>
    );
  }
}
