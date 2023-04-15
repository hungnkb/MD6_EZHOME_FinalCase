import React, { useState, useEffect, setState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { Button, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DashboardHosting() {
  const [homeList, setHomeList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentAuth = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(null);
  const [flag, setFlag] = useState(false);

  const label = { inputProps: { true: 'false' } };
  const navigate = useNavigate();

  const handleChange = async (event, id) => {
    await axios({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/homes/status',
      data: {
        idHome: id,
        status: event.target.checked
      },
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token')),
      },
    })
    setFlag(!flag);
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const getDataHome = async () => {
      const dataList = await axios.get(
        `http://localhost:3002/api/v1/homes?idUser=${currentAuth.userLogin.sub}`,
        {
          headers: { Authorization: JSON.parse(localStorage.getItem('token')) },
        },
      );
      setHomeList(dataList.data);
    };
    getDataHome();
  }, [currentAuth.isLogined, flag]);
  return (
    <>
      <Button onClick={() => {navigate('/create-home')}} style={{ background: '#f7a800' }} variant="contained">Add home</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Bathrooms</TableCell>
              <TableCell align="center">Bedrooms</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Price (đ)</TableCell>
              <TableCell align="center">Rate</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homeList
              ? homeList.map((data, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{data.title}</TableCell>
                  <TableCell align="left">{data.address}</TableCell>
                  <TableCell align="left">
                    {data.idCategory.categoryName}
                  </TableCell>
                  <TableCell align="right">{data.bathrooms}</TableCell>
                  <TableCell align="right">{data.bedrooms}</TableCell>
                  <TableCell align="left">{data.description}</TableCell>
                  <TableCell align="right">{data.price.toLocaleString('en-EN')}</TableCell>
                  <TableCell align="center">{data.rate_stars}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={data.status}
                      onChange={(e) => handleChange(e, data.idHome)}
                      inputProps={{ true: 'false' }}
                      color="warning"
                    />
                  </TableCell>
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DashboardHosting;
