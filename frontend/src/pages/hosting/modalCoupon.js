import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Datepicker } from '@mobiscroll/react';
export default function ModalCoupon() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const props = { placeholder: 'Please Select Date...' };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{
          color: 'black',
          background: 'white',
          border: '1px solid black',
          borderRadius: '30px',
          marginLeft: '80%',
        }}
        variant="light"
      >
        <i class="fa-solid fa-circle-plus"></i> Generate discount code
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {' Create 1 voucher  '}
        </DialogTitle>
        <DialogContent>
          Contents : <input type='text'/>
           % : <input type='number'/>
          <Datepicker
            controls={['calendar']}
            select="range"
            touchUi={true}
            inputComponent="input"
            inputProps={props}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
