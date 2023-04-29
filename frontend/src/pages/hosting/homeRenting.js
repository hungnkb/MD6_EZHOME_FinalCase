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
import { Chip } from '@mui/material';
import PaginationHomeRenting from './PaginationHomeRenting';

export default function HomeRenting() {
  const [homeRent, setHomeRent] = useState([]);
  const [homeRentted, setHomeRentted] = useState([]);
  const [status, setStatus] = React.useState('All Status');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const result = [];
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
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = result.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div style={{ marginBottom: '400px' }}>
        <br />
        <h2 style={{ marginLeft: '8%' }}>Customer Order List</h2>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, marginLeft: '8%' }}
        >
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={status}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="all">All Order</MenuItem>
            <MenuItem value="ongoing">On Going</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="cancelled">Cancel</MenuItem>
          </Select>
        </FormControl>
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
                {/*<TableCell align="center">*/}
                {/*   */}
                {/*    <b> Total Price</b>*/}
                {/*</TableCell>*/}
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
              {currentPosts
                ? currentPosts.map((data, index) => (
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
                : null}
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
