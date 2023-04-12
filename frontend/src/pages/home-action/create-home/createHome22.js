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

export default function CreateHome22() {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ flexGrow: 1, marginTop: '50px', marginBottom: '50px' }}>
                <Grid container spacing={2} style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <h1>Where's your place located?</h1>
                    
                </Grid>
                <Grid style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <Button onClick={() => navigate('/create-home2/1')} variant="contained">Back</Button>
                    <Button onClick={() => navigate('/create-home2/3')} variant="contained">Next</Button>
                </Grid>
            </Box>
        </>

    );
}