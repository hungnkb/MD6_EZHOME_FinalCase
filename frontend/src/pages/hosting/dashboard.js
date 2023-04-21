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
import { Button, ButtonGroup, Switch } from '@mui/material';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import detailDashboard from './detailDashboard';
import DetailDashboard from './detailDashboard';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function DashboardHosting() {
  const [homeList, setHomeList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentAuth = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(null);
  const [flag, setFlag] = useState(false);

  const label = { inputProps: { true: 'false' } };
  const navigate = useNavigate();
  const [item, setItem] = useState();
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
    setLgShow(true);
  };

  useEffect(() => {
    if (!currentAuth.isLogined) {
      navigate('/');
    }
  }, []);

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
        <div className="row">
          <div className="col-12">
            <ButtonGroup
              sx={{
                marginLeft: '80%',
                borderRadius: '20px',
                backgroundColor: 'white',
              }}
              color="warning"
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button
                onClick={() => {
                  navigate('/create-home');
                }}
                sx={{ background: '#f7a800' }}
                variant="contained"
              >
                {' '}
                Views order
              </Button>
              <Button
                onClick={() => {
                  navigate('/create-home');
                }}
                sx={{ background: '#f7a800' }}
                variant="contained"
              >
                {' '}
                +Add home
              </Button>
            </ButtonGroup>
          </div>
        </div>

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
                <TableCell align="center">
                  <b>Bathrooms </b>{' '}
                </TableCell>
                <TableCell align="center">
                  <b> Bedrooms</b>{' '}
                </TableCell>
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
                {/*<TableCell align="center" colSpan={2}>*/}
                {/*  <b>Action </b>{' '}*/}
                {/*</TableCell>*/}
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
                        <Form.Check aria-label="option 1" />
                      </TableCell>
                      <TableCell align="left" sx={{ width: '30%' }}>
                        {' '}
                        <img
                          style={{ width: '20%', borderRadius: '5px' }}
                          src={data?.images[0]?.urlHomeImage}
                          alt="house"
                        />{' '}
                        <b style={{ marginLeft: '20px' }}> {data.title} </b>
                      </TableCell>
                      <TableCell align="left">{data.address}</TableCell>
                      <TableCell align="left">
                        {data.idCategory.categoryName}
                      </TableCell>
                      <TableCell align="right">{data.bathrooms}</TableCell>
                      <TableCell align="right">{data.bedrooms}</TableCell>
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
                      {/*<TableCell align="center">*/}
                      {/*  <Button variant="light" onClick={() => getData(data)}> <i*/}
                      {/*      className="fa-solid fa-pen-to-square"*/}
                      {/*      style={{*/}
                      {/*        color: 'green',*/}
                      {/*        fontSize: '130%',*/}
                      {/*      }}*/}
                      {/*  ></i></Button>*/}
                      {/*</TableCell>*/}
                      {/*<TableCell align="center">*/}
                      {/*  <i*/}
                      {/*      className="fa-solid fa-trash"*/}
                      {/*      style={{*/}
                      {/*        color: 'red',*/}
                      {/*        fontSize: '130%',*/}
                      {/*      }}*/}
                      {/*  ></i>*/}
                      {/*</TableCell>*/}
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <DetailDashboard
          dashboard={item}
          setLgShow={setLgShow}
          lgShow={lgShow}
        />
      </div>
    </>
  );
}

export default DashboardHosting;
