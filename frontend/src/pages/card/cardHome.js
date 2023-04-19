import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import CarouselMulti from '../../components/layout/carousel-multi';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import login from "../../components/user/Login";

export default function CardHome(props) {
    const [home, setHome] = useState([]);
    const {loading = false} = props;
    useEffect(() => {
        setTimeout(() => {
            axios
                .get('http://localhost:3002/api/v1/homes')
                .then((res) => {
                    setHome(res.data)
                });
        }, 1500)
    }, []);
    return (
        <>

            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-12">
                        <CarouselMulti/>
                    </div>
                </div>
                <br/>
                <div className="d-flex flex-wrap justify-content-center">
                    {home.length > 0 ? (
                        home.map((value, index) => {
                            if (value.status) {
                                return (
                                    <NavLink key={index} to={`/detail-home/${value.idHome}`} style={{
                                        marginRight: "20px",
                                        width: '256px',
                                        display: 'inline-block',
                                        textDecoration: "none"
                                    }}>
                                        <Card
                                            sx={{
                                                width: '100%',
                                                boxShadow: 'none',
                                                marginTop: '5%',
                                                marginLeft: '2%',
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    style={{
                                                        height: 250,
                                                        borderRadius: '7%',
                                                    }}
                                                    component="img"
                                                    height="250%"
                                                    image={value?.images[0]?.urlHomeImage}
                                                    alt="green iguana"
                                                    //{value?.images[0].urlHomeImage}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="p" component="div">
                                                        <b> {value.title}</b>
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {value.address}
                                                    </Typography>
                                                    <Typography gutterBottom variant="p" component="div">
                                                        <b>{value.price.toLocaleString('en-EN')}đ</b> night
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>)
                            } else {
                                return ''
                            }
                        })
                    ) : (
                        <>
                            <Stack direction="row" spacing={5} sx={{marginTop: '50px'}}>
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width={256}
                                    height={250}
                                    sx={{borderRadius: '15px'}}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width={256}
                                    height={250}
                                    sx={{borderRadius: '15px'}}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width={256}
                                    height={250}
                                    sx={{borderRadius: '15px'}}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width={256}
                                    height={250}
                                    sx={{borderRadius: '15px'}}
                                />
                            </Stack>
                        </>
                    )}

                </div>


            </div>
        </>
    );
}
