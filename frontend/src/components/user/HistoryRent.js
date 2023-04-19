import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [historyRent, setHistoryRent] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3002/api/v1/orders?idUser=${localStorage.getItem(
          'idUser',
        )}`,
      )
      .then((res) => {
        console.log(res.data, 123);
        setHistoryRent(res.data);
      });
}, []);

  return (
    <div>
      <Button
        style={{ textTransform: 'none', textDecoration: 'underline' }}
        onClick={handleOpen}
      >
        History Rent
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              textAlign: 'center',
              marginBottom: '40px',
              fontWeight: 'bold',
            }}
          >
            History Rent
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    Home 
                  </TableCell>

                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    Check In
                  </TableCell>

                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    Check Out
                  </TableCell>

                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    Charged
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyRent.map((value, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="right">{value.idHome.title}</TableCell>
                    <TableCell align="right">{value.checkin}</TableCell>
                    <TableCell align="right">{value.checkout}</TableCell>
                    <TableCell align="right">{value.charged}</TableCell>
                    <TableCell>{value.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}

export default HistoryRent;
