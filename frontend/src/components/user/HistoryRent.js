import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Chip} from "@mui/material";
import Swal from "sweetalert2";


function HistoryRent() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height:'%'
  };
  const [status, setStatus] = React.useState('');
  const [historyRent, setHistoryRent] = useState([]);
  const [list, setList] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [count, setCount] = useState(0);

  console.log(historyRent,2345)
  useEffect(() => {
    axios
      .get(
        `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem(
          'idUser',
        )}`,
      )
      .then((res) => {
        console.log(historyRent)
        console.log(res.data,333)
        setHistoryRent(res.data);
        setList(res.data);
      });
}, []);
  useEffect(() => {
    if (status === 'all'){
      const getDataRent = async () => {
        const dataList = await axios.get(
            `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem(
                'idUser',
            )}`
        );
        console.log(dataList.data)
        setList(dataList.data)
      };
      getDataRent();
    }
    else {
      const getDataRent = async () => {
        const dataList = await axios.get(
            `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem("idUser")}&&status=${status}`
        );
        setList(dataList.data)
      };
      getDataRent();
    }
  }, [status]);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleButtonClick = (event) => {
    const id = event.target.getAttribute('data-id');
    setCount(count + 1);
    doSomethingWithId(id);
  };
  const doSomethingWithId = async (idOrder) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this reservation?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I wan to cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:3002/api/v1/orders/${idOrder}`).then(
            (response) => {
              console.log(response)
              Swal.fire(
                  'Deleted!',
                  'Your Order has been cancel.',
                  'success'
              )
              axios
                  .get(
                      `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem(
                          'idUser',
                      )}`,
                  )
                  .then((res) => {
                    setList(res.data);
                  });
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cannot Cancel!',
              });
            },);
      }
    })
  };
  console.log(status)
    console.log(count)
  return (
      <>
        <br />
        <h2 style={{marginLeft: "8%"}}>My Orders</h2>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginLeft: "8%" }}>
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
        <TableContainer component={Paper} sx={{
          height: "80%", width: "90%", marginLeft: "8%"
        }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b> # </b>{' '}
                </TableCell>
                <TableCell align="center">
                  <b> Home </b>{' '}
                </TableCell>
                <TableCell align="center">
                  <b> Checkin</b>{' '}
                </TableCell>
                <TableCell align="center">
                  <b> Checkout </b>{' '}
                </TableCell>
                <TableCell align="center">
                  <b>Charge </b>{' '}
                </TableCell>
                <TableCell align="center">
                  <b>Status </b>{' '}
                </TableCell>
                <TableCell align="center">
                  {' '}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list
                  ? list.map((data, index) => (
                      <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <b> {index + 1} </b>
                        </TableCell>
                        <TableCell align="center">{data.idHome.title}</TableCell>
                        <TableCell align="center">{data.checkin}</TableCell>
                        <TableCell align="center">{data.checkout}</TableCell>
                        <TableCell align="center">{data.charged.toLocaleString('en-EN')}VNĐ</TableCell>
                        {
                          (data.status === "ongoing") ?
                              <>
                              <TableCell align="center">
                                <Chip label="On Going" color="primary" />
                              </TableCell>
                              <TableCell>
                                <Button variant="outlined" color="error" onClick={handleButtonClick} data-id={data.idOrder}>
                                  Cancel
                                </Button>
                              </TableCell>
                              </>
                              :
                              data.status === "done" ? <TableCell align="center"><Chip label="Rented" color="success" sx={{width: "80px"}} /></TableCell>
                                  : <TableCell align="center"><Chip label="Cancel" color="warning" /></TableCell>
                        }
                      </TableRow>
                  ))
                  : null}
            </TableBody>
          </Table>
        </TableContainer>
      </>

  );
}

export default HistoryRent;
