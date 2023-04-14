import React from 'react';
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import './footer.css';
export default class Footer extends React.Component {
  render() {
    return (
      <MDBFooter bgColor="light" className="text-center text-lg-left">
        <MDBContainer className="p-4">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h6 className="text-uppercase">Support</h6>

              <ul className="list-unstyled mb-0">
                <li>
                  <NavLink href="#!" className="text-dark">
                    Help Centre
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    AirCover
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    Supporting people with disabilities
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    Cancellation options
                  </NavLink>
                </li>
              </ul>
            </MDBCol>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h6 className="text-uppercase mb-0">Community</h6>

              <ul className="list-unstyled">
                <li>
                  <NavLink href="#!" className="text-dark">
                    Airbnb.org: disaster relief housing
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    Combating discrimination
                  </NavLink>
                </li>
              </ul>
            </MDBCol>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h6 className="text-uppercase">Hosting</h6>

              <ul className="list-unstyled mb-0">
                <li>
                  <NavLink href="#!" className="text-dark">
                    Airbnb your home
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    AirCover for Hosts
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    Explore hosting resources
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    Visit our community forum
                  </NavLink>
                </li>
              </ul>
            </MDBCol>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h6 className="text-uppercase mb-0">EzHome</h6>

              <ul className="list-unstyled">
                <li>
                  <NavLink href="#!" className="text-dark">
                    Newsroom
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    Learn about new features
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    Letter from our founders
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#!" className="text-dark">
                    Careers
                  </NavLink>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <NavLink className="text-dark" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </NavLink>
        </div>
      </MDBFooter>
    );
  }
}
