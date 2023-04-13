import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import Autocomplete from "react-google-autocomplete";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

export default function CreateHome22() {
    const [map, setMap] = useState(null)
    const navigate = useNavigate()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDzzi_VBcf2Oef6LTViLU767UPNHlnIze4"
    })


    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1, marginTop: '50px', marginBottom: '50px' }}>
                <Grid container spacing={2} style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <h1>Where's your place located?</h1>
                    <Autocomplete
                        apiKey="AIzaSyDzzi_VBcf2Oef6LTViLU767UPNHlnIze4"
                        onPlaceSelected={(place) => {
                            console.log(place);
                        }}
                    />;
                    {
                        isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                            </GoogleMap>
                        ) : <></>
                    }
                </Grid>
                <Grid style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <Button onClick={() => navigate('/create-home2/1')} variant="contained">Back</Button>
                    <Button onClick={() => navigate('/create-home2/3')} variant="contained">Next</Button>
                </Grid>
            </Box>
        </>

    );
}