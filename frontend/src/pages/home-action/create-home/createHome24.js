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
    const currentState = useSelector(state => state.createHome);

    const onDrop = useCallback(acceptedFiles => {
        setImages(images => [...images, ...acceptedFiles]);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <>
            <div className="row">
                <div className="col-5">
                    <h1 style={{fontSize:"350%", marginTop:"100px"}}>It’s easy to get started on EZHOME</h1>
                </div>
                <div className="col-7">
                    <h2>Some more information about your home</h2>
                    <div className="row" style={{width:700,height:400, border:"2px solid gray"}}>
                        <div className="col-6">
                            every here.....

                        </div>
                        <div className="col-6"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10"></div>
                <div className="col-2">
                    <Button id="btn-create23" onClick={() => navigate('/create-home2/3')} variant="contained">Back</Button>
                    <Button id="btn-create231" variant="contained">Next</Button>
                </div>
            </div>
        </>
    );
}