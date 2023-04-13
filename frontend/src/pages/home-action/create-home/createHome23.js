import React, { useState, useCallback, useEffect } from 'react';
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

export default function CreateHome23() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.createHome);
  const [check, setCheck] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setImages((images) => [...images, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (images.length > 0) {
      setCheck(true);
    }
  }, [images]);
  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: '50px', marginBottom: '50px' }}>
        <Grid
          container
          spacing={2}
          style={{ marginLeft: '5%', marginRight: '5%' }}
        >
          <h1>Make your home more beautiful</h1>

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          <div style={{ display: 'flex', direction: 'ltr' }}>
            {images.map((image, i) => (
              <img
                style={{ width: '150px' }}
                key={i}
                src={URL.createObjectURL(image)}
              />
            ))}
          </div>
        </Grid>
        <Grid style={{ marginLeft: '5%', marginRight: '5%' }}>
          <Button
            onClick={() => navigate('/create-home2/2')}
            variant="contained"
          >
            Back
          </Button>
          {check ? (
            <Button
              onClick={() => navigate('/create-home2/4')}
              variant="contained"
            >
              Next
            </Button>
          ) : (
            <Button
              style={{ marginLeft: '10px', background: 'gray' }}
              Button
              variant="contained"
              type='button'
            >
              Next
            </Button>
          )}
        </Grid>
      </Box>
    </>
  );
}
