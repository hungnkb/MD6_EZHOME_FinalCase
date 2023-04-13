import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setCategory } from '../../../redux/features/homeSlice';
import { useDispatch, useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CreateHome21() {
    const [check, setCheck] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const currentState = useSelector(state => state.createHome);
    useEffect(() => {
        setCheck(true)
    }, [currentState.idCategory])

    return (
        <>
            <Box sx={{ flexGrow: 1, marginTop: '50px', marginBottom: '50px' }}>
                <Grid container spacing={2} style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <Box>
                        <h1>Which of these best describes your place?</h1>
                        <Button onClick={() => { dispatch(setCategory(1)); setCheck(true) }}>Single</Button>
                        <Button onClick={() => { dispatch(setCategory(2)); setCheck(true) }}>Pair</Button>
                        <Button onClick={() => { dispatch(setCategory(3)); setCheck(true) }}>Presidential</Button>
                        <Button onClick={() => { dispatch(setCategory(4)); setCheck(true) }}>VIP</Button>
                        <Button onClick={() => { dispatch(setCategory(5)); setCheck(true) }}>Luxury</Button>
                    </Box>

                </Grid>
                <Grid style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <Button onClick={() => navigate('/create-home2')} variant="contained">Back</Button>
                    {check ? (<Button onClick={() => navigate('/create-home2/2')} variant="contained">Next</Button>) : null}
                </Grid>
            </Box>
        </>

    );
}