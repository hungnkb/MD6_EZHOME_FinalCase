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
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import detailDashboard from "./detailDashboard";
import DetailDashboard from "./detailDashboard";
function DashboardHosting() {
  const [homeList, setHomeList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentAuth = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(null);
  const [flag, setFlag] = useState(false);

  const label = { inputProps: { true: 'false' } };
  const navigate = useNavigate();
  const [item,setItem]=useState();
  const [lgShow, setLgShow] = useState(false);
  const handleChange = async (event, id) => {
    await axios({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/homes/status',
      data: {
        idHome: id,
        status: event.target.checked,
      },
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token')),
      },
    });
    setFlag(!flag);
    setChecked(event.target.checked);
  };

  const getData = (data) => {
    setItem(data);
    setLgShow(true)
  }

  useEffect(() => {
    if (!currentAuth.isLogined) {
      navigate('/')
    }
  }, [])

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
      <div className="container">
        <br />
        <Button
            onClick={() => {
              navigate('/create-home');
            }}
            style={{ background: '#f7a800', marginLeft: '90%' }}
            variant="contained"
        >
          {' '}
          +Add home
        </Button>
        <hr />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b> Order </b>{' '}
                </TableCell>
                <TableCell align="center">
                  <b> Title </b>{' '}
                </TableCell>
                <TableCell align="center">
                  {' '}
                  <b> Address</b>{' '}
                </TableCell>
                <TableCell align="center">
                  <b> Category</b>{' '}
                </TableCell>
                {/*<TableCell align="center">*/}
                {/*  <b>Bathrooms </b>{' '}*/}
                {/*</TableCell>*/}
                {/*<TableCell align="center">*/}
                {/*  <b> Bedrooms</b>{' '}*/}
                {/*</TableCell>*/}
                {/*<TableCell align="center">*/}
                {/*  <b>Description </b>{' '}*/}
                {/*</TableCell>*/}
                <TableCell align="center">
                  {' '}
                  <b>Price (đ) </b>{' '}
                </TableCell>
                {/*<TableCell align="center">*/}
                {/*  <b> Rate</b>{' '}*/}
                {/*</TableCell>*/}
                <TableCell align="center">
                  <b>Status </b>{' '}
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  <b>Action </b>{' '}
                </TableCell>
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
                          <b> {index + 1} </b>
                        </TableCell>
                        <TableCell align="left">{data.title}</TableCell>
                        <TableCell align="left">{data.address}</TableCell>
                        <TableCell align="left">
                          {data.idCategory.categoryName}
                        </TableCell>
                        {/*<TableCell align="right">{data.bathrooms}</TableCell>*/}
                        {/*<TableCell align="right">{data.bedrooms}</TableCell>*/}
                        {/*<TableCell align="left">{ReactHtmlParser(data.description)}</TableCell>*/}
                        <TableCell align="right">
                          {data.price.toLocaleString('en-EN')}
                        </TableCell>
                        {/*<TableCell align="center">{data.rate_stars}</TableCell>*/}
                        <TableCell align="center">
                          <Switch
                              checked={data.status}
                              onChange={(e) => handleChange(e, data.idHome)}
                              inputProps={{ true: 'false' }}
                              color="warning"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button variant="light" onClick={() => getData(data)}> <i
                              className="fa-solid fa-pen-to-square"
                              style={{
                                color: 'green',
                                fontSize: '130%',
                              }}
                          ></i></Button>
                        </TableCell>
                        <TableCell align="center">
                          <i
                              className="fa-solid fa-trash"
                              style={{
                                color: 'red',
                                fontSize: '130%',
                              }}
                          ></i>
                        </TableCell>
                      </TableRow>
                  ))
                  : null}
            </TableBody>
          </Table>
        </TableContainer>
        <DetailDashboard  dashboard={item} setLgShow={setLgShow} lgShow={lgShow}/>

      </div>
    </>
  );
}
export default DashboardHosting;
