import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { Button, InputAdornment, Switch } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  const [listCoupon, setListCoupon] = useState([]);
  const [addCoupon, setAddCoupon] = useState(0)

  useEffect(() => {
    const coupon = () => {
      let dateNow = new Date();
      dateNow = dateNow.getTime();
      axios
        .get(
          `http://localhost:3002/api/v1/coupons?idUser=${currentAuth.userLogin.sub}`,
        )
        .then((res) => {
          let newListCoupon = [];
          for (let i = 0; i < res.data.length; i++) {
            let startDate = new Date(res.data[i].startDate);
            startDate = startDate.getTime();
            let endDate = new Date(res.data[i].endDate);
            endDate = endDate.getTime();
            if (startDate <= dateNow && endDate >= dateNow) {
              newListCoupon.push(res.data[i]);
            }
          }
          setListCoupon(newListCoupon);
        });
    };
    coupon();
  }, []);
  const handleChangeCoupon = (e,index) => {
    setAddCoupon(e.target.value);
    //id nha, id coupon

  };
 
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
  console.log(homeList, 22);
  return (
    <>
      <br />
      <br />
      <h3 style={{ marginLeft: '3%' }}>{homeList.length} house for rent</h3>

      <br />
      <div className="row">
        <div className="col-4">
          <input
            style={{
              border: '1px solid black',
              marginLeft: '10%',
              borderRadius: '30px',
              width: '90%',
              height: '110%',
            }}
            placeholder="   Search"
            type="search"
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  style={{ borderRadius: '30px' }}
                  position="start"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="col-4">
          {' '}
          <Button
            onClick={() => {
              navigate('/user/revenue');
            }}
            sx={{
              color: 'black',
              background: 'white',
              border: '1px solid black',
              borderRadius: '30px',
            }}
            variant="light"
          >
            Revenue
          </Button>
          <Button
            onClick={() => {
              navigate('/user/home');
            }}
            sx={{
              color: 'black',
              background: 'white',
              border: '1px solid black',
              marginLeft: '20px',
              borderRadius: '30px',
            }}
            variant="light"
          >
            Views order
          </Button>
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-6">
              <NavLink to="/user/coupon">
                <Button
                  sx={{
                    color: 'black',
                    background: 'white',
                    border: '1px solid black',
                    borderRadius: '30px',
                    marginLeft: '50%',
                  }}
                  variant="light"
                >
                  <i class="fa-solid fa-badge-percent"></i> Voucher
                </Button>
              </NavLink>
            </div>
            <div className="col-6">
              <Button
                onClick={() => {
                  navigate('/create-home');
                }}
                sx={{
                  color: 'black',
                  background: 'white',
                  border: '1px solid black',
                  //   marginLeft: '45%',
                  borderRadius: '30px',
                }}
                variant="light"
              >
                <i class="fa-solid fa-circle-plus"></i> Create a rental item
              </Button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <TableContainer component={Paper} style={{ marginBottom: '400px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b style={{ color: 'gray' }}> Image </b>
              </TableCell>
              <TableCell align="center">
                <b style={{ color: 'gray' }}> Title </b>
              </TableCell>
              <TableCell align="center">
                <b style={{ color: 'gray' }}> Address</b>
              </TableCell>
              <TableCell align="center">
                <b style={{ color: 'gray' }}>Price (đ) </b>
              </TableCell>
              <TableCell align="center">
                <b style={{ color: 'gray' }}>Status </b>
              </TableCell>
              <TableCell align="center">
                <b style={{ color: 'gray' }}>Voucher </b>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homeList
              ? homeList.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      sx={{ width: '10%', padding: '0px 0px' }}
                    >
                      <img
                        style={{ width: '50%', borderRadius: '5px' }}
                        src={data?.images[0]?.urlHomeImage}
                        alt="house"
                      />
                    </TableCell>
                    <TableCell align="left" sx={{ width: '30%' }}>
                      <NavLink
                        style={{ color: 'black' }}
                        to={`/detail-dashboard/${data.idHome}`}
                      >
                        <b style={{ color: 'black' }}> {data.title} </b>
                      </NavLink>
                    </TableCell>
                    <TableCell align="left">{data.address}</TableCell>
                    <TableCell align="right">
                      {data.price.toLocaleString('en-EN')}
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={data.status}
                        onChange={(e) => handleChange(e, data.idHome)}
                        inputProps={{ true: 'false' }}
                        color="warning"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <div>
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-multiple-checkbox-label">
                            <p style={{ color: 'red' }}>Apply Voucher</p>
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            // multiple
                            value={addCoupon}
                            onChange={(e) => handleChangeCoupon(e, index)}
                            input={<OutlinedInput label="Tag" />}
                            MenuProps={MenuProps}
                          >
                            {listCoupon.map((name) => (
                              <MenuItem key={name.couponname} value={name.idCoupon}>
                                <ListItemText primary={name.couponname} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
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
