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

export default function CreateHome23() {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ flexGrow: 1, marginTop: '50px', marginBottom: '50px' }}>
                <Grid container spacing={2} style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <Grid xs={6}>
                        <p style={{ fontSize: '70px' }}>It’s easy to get started on EZHOME</p>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <h1>1 Tell us about your place</h1>
                            <p>Share some basic info, like where it is and how many guests can stay.</p>
                        </Item>
                        <Item>
                            <h1>2 Make it stand out</h1>
                            <p>Share some basic info, like where it is and how many guests can stay.</p>
                        </Item>
                        <Item>
                            <h1>3 Finish up and publish</h1>
                            <p>Share some basic info, like where it is and how many guests can stay.</p>
                        </Item>
                    </Grid>
                </Grid>
                <Grid style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <Button onClick={() => navigate('/create-home2/2')} variant="contained">Back</Button>
                    <Button  variant="contained">Finish</Button>
                </Grid>
            </Box>
        </>

    );
}