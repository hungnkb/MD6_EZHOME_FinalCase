import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CreateHome2() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container" style={{ marginTop: '90px' }}>
        <div className="row">
          <div className="col-6">
            <h1 style={{ fontSize: '350%' }}>
              It’s easy to get started on EZHOME
            </h1>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-10">
                <h3>
                  <b> 1 Tell us about your place</b>{' '}
                </h3>
                <h5 style={{ color: 'gray' }}>
                  Share some basic info, like where it is and how many guests
                  can stay.
                </h5>
              </div>
              <div className="col-2">
                <img
                  src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
                  alt="create"
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-10">
                <h3>
                  <b> 2 Make it stand out</b>{' '}
                </h3>
                <h5 style={{ color: 'gray' }}>
                  Share some basic info, like where it is and how many guests
                  can stay.
                </h5>
              </div>
              <div className="col-2">
                <img
                  src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
                  alt="create"
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-10">
                <h3>
                  <b>3 Finish up and publish </b>
                </h3>
                <h5 style={{ color: 'gray' }}>
                  Share some basic info, like where it is and how many guests
                  can stay.
                </h5>
              </div>
              <div className="col-2">
                <img
                  src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
                  alt="create"
                />
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <Grid style={{ marginLeft: '80%' }}>
        <Button
          onClick={() => navigate('/create-home2/1')}
          style={{ background: '#f7a800' }}
          variant="contained"
        >
          Get started
        </Button>
      </Grid>
    </>
  );
}
