import React, { useState, useEffect, setState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../api/axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import PaginationHomeRenting from './PaginationHomeRenting';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';
import Bean from '../../media/bean.gif';
import CircularProgress from '@mui/material/CircularProgress';

export default function HomeRenting() {
  const [homeRent, setHomeRent] = useState([]);
  const [homeRentCount, setHomeRentCount] = useState([]);
  const [status, setStatus] = React.useState('All Status');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const result = [];
  const counStatus = [];
  const [countTab, setCountTabs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getDataRent = async () => {
      const dataList = await axios.get(
        `http://localhost:3002/api/v1/homes?idUser=${localStorage.getItem(
          'idUser',
        )}`,
      );
      setHomeRent(dataList.data.filter((home) => home.orders.length > 0));
    };
    getDataRent();
  }, []);
  useEffect(() => {
    const getDataRent = async () => {
      const dataList = await axios.get(
        `http://localhost:3002/api/v1/homes?idUser=${localStorage.getItem(
          'idUser',
        )}`,
      );
      setHomeRentCount(dataList.data.filter((home) => home.orders.length > 0));
    };
    getDataRent();
  }, []);

  useEffect(() => {
    if (status == 'all') {
      const getDataRent = async () => {
        const dataList = await axios.get(
          `http://localhost:3002/api/v1/homes?idUser=${localStorage.getItem(
            'idUser',
          )}`,
        );
        setHomeRent(dataList.data.filter((home) => home.orders.length > 0));
      };
      getDataRent();
    }
    const getDataRent = async () => {
      const dataList = await axios.get(
        `http://localhost:3002/api/v1/homes?idUser=${localStorage.getItem(
          'idUser',
        )}&&status=${status}`,
      );
      setHomeRent(dataList.data.filter((home) => home.orders.length > 0));
    };
    getDataRent();
  }, [status]);
  for (let i = 0; i < homeRent.length; i++) {
    homeRent[i].orders.map((order) =>
      result.push({
        title: homeRent[i].title,
        address: homeRent[i].address,
        email: order.idUser.email,
        phone: order.idUser.phone,
        checkin: order.checkin,
        checkout: order.checkout,
        status: order.status,
      }),
    );
  }
  for (let i = 0; i < homeRentCount.length; i++) {
    homeRentCount[i].orders.map((order) =>
      counStatus.push({
        status: order.status,
      }),
    );
  }
  console.log(counStatus, 555);

  const handleChange = (value) => {
    setStatus(value);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = result.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts1 = result.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sumGoing = () => {
    let sum = 0;
    for (let i = 0; i < counStatus.length; i++) {
      if (counStatus[i].status === 'ongoing') {
        sum++;
      }
    }
    return sum;
  };
  const sumDone = () => {
    let sum1 = 0;
    for (let i = 0; i < counStatus.length; i++) {
      if (counStatus[i].status === 'done') {
        sum1++;
      }
    }
    return sum1;
  };
  const sumCancel = () => {
    let sum2 = 0;
    for (let i = 0; i < counStatus.length; i++) {
      if (counStatus[i].status === 'cancelled') {
        sum2++;
      }
    }
    return sum2;
  };
  return (
    <>
      <div style={{ marginBottom: '400px' }}>
        <br />
        <h2 style={{ marginLeft: '8%' }}>Customer Order List</h2>
        <Tabs
          handleChange={handleChange}
          status={status}
          sumGoing={sumGoing()}
          all={counStatus.length}
          done={sumDone()}
          cancel={sumCancel()}
        />
        <TableContainer
          component={Paper}
          sx={{
            height: '80%',
            width: '90%',
            marginLeft: '8%',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b> Number</b>
                </TableCell>
                <TableCell align="center">
                  <b> Email </b>
                </TableCell>
                <TableCell align="center">
                  <b> Phone</b>
                </TableCell>
                <TableCell align="center">
                  <b> Home </b>
                </TableCell>
                <TableCell align="center">
                  <b>Checkin </b>
                </TableCell>
                <TableCell align="center">
                  <b> Checkout</b>
                </TableCell>
                <TableCell align="center">
                  <b>Status </b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPosts && currentPosts.length > 0 ? (
                currentPosts.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <b> {index + 1} </b>
                    </TableCell>
                    <TableCell align="center">{data.email}</TableCell>
                    <TableCell align="center">{data.phone}</TableCell>
                    <TableCell align="center">{data.title}</TableCell>
                    <TableCell align="center">{data.checkin}</TableCell>
                    <TableCell align="center">{data.checkout}</TableCell>
                    {data.status === 'ongoing' ? (
                      <TableCell align="center">
                        <p style={{ color: '#f7a800' }}>
                          <i className="fa-solid fa-circle"></i> On going
                        </p>
                      </TableCell>
                    ) : data.status === 'done' ? (
                      <TableCell align="center">
                        <p style={{ color: 'green' }}>
                          <i className="fa-solid fa-circle"></i> Done
                        </p>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <p style={{ color: 'red' }}>
                          <i className="fa-solid fa-circle"></i> Cancel
                        </p>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                ''
                // <Stack
                //   sx={{ color: 'grey.500', marginLeft: '700px' }}
                //   spacing={2}
                //   direction="row"
                // >
                //   <CircularProgress color="inherit" />
                // </Stack>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <div className="d-flex flex-wrap justify-content-center">
          <PaginationHomeRenting
            postsPerPage={postsPerPage}
            totalPosts={result.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}

export function Tabs(props) {
  return (
    <>
      <MDBTabs justify className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => props.handleChange('all')}
            active={props.status === 'all'}
          >
            <b> All order ({props.all})</b>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => props.handleChange('ongoing')}
            active={props.status === 'ongoing'}
          >
            <b> On going ({props.sumGoing}) </b>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => props.handleChange('done')}
            active={props.status === 'done'}
          >
            <b> Done ({props.done})</b>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => props.handleChange('cancelled')}
            active={props.status === 'cancelled'}
          >
            <b> Cancel({props.cancel})</b>
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
    </>
  );
}
