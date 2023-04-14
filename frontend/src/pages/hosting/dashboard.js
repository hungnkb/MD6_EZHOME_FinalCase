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
import { Switch } from '@mui/material';

function DashboardHosting() {
  const [homeList, setHomeList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentAuth = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(true);

  const label = { inputProps: { true: 'false' } };
  console.log(homeList[0]?.status);
  const handleChange = (event, id) => {
    const newDataHome = homeList.map((home) => {
      if (home.idHome == id) {
        home.status = home.status === 'false' ? 'true' : 'false';
      }
      return home;
    });
    setHomeList(newDataHome);
    setChecked(event.target.checked);
    console.log(homeList);
    const switchState = {};

    homeList.forEach((item, index) => {
      switchState['switch-' + index] = false;
    });

    setState({
      switchState: switchState,
    });
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
  }, [currentAuth.isLogined]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Bathrooms</TableCell>
              <TableCell align="right">Bedrooms</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Status</TableCell>
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
                    <TableCell align="right">{data.title}</TableCell>
                    <TableCell align="right">{data.address}</TableCell>
                    <TableCell align="right">
                      {data.idCategory.categoryName}
                    </TableCell>
                    <TableCell align="right">{data.bathrooms}</TableCell>
                    <TableCell align="right">{data.bedrooms}</TableCell>
                    <TableCell align="right">{data.description}</TableCell>
                    <TableCell align="right">{data.price}</TableCell>
                    <TableCell align="right">{data.rate_stars}</TableCell>
                    <TableCell align="right">
                      <Switch
                        checked={checked}
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
