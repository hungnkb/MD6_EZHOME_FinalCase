import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CreateHome24() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.createHome);

  const onDrop = useCallback((acceptedFiles) => {
    setImages((images) => [...images, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: '50px', marginBottom: '50px' }}>
        <Grid
          container
          spacing={2}
          style={{ marginLeft: '5%', marginRight: '5%' }}
        >
          <Grid xs={6}>
            <p style={{ fontSize: '70px' }}>
              It’s easy to get started on EZHOME
            </p>
          </Grid>
          <Grid xs={6}>
            <h1>Some more information about your home</h1>
          </Grid>
        </Grid>
        <Grid style={{ marginLeft: '5%', marginRight: '5%' }}>
          <Button
            onClick={() => navigate('/create-home2/3')}
            variant="contained"
          >
            Back
          </Button>
          <Button variant="contained">Next</Button>
        </Grid>
      </Box>
    </>
  );
}
