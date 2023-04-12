import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function CardHome() {
    const [home , setHome]=  useState([])
    useEffect(  ()=>{
     axios.get('http://localhost:3002/api/v1/homes').then(res=>setHome(res.data))
    },[])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {home.map((value, index) => (
                            <NavLink to={`/detail-home/${value.idHome}`}>
                                <Card sx={{
                                    maxWidth: 250,
                                    boxShadow: "none",
                                    marginTop: "50px",
                                    float: "left",
                                    marginLeft: "20px"
                                }}>
                                    <CardActionArea>
                                        <CardMedia style={{height: 250, borderRadius: "15px"}}
                                                   component="img"
                                                   height="250"
                                                   image="https://a0.muscache.com/im/pictures/2ebf3b25-9b6c-402f-9b29-23aa2a5e5b21.jpg?im_w=720"
                                                   alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                              <b> {value.title}</b>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {value.address}
                                            </Typography>
                                            <Typography gutterBottom variant="p" component="div">
                                              <b>{value.price.toLocaleString("en-EN")}đ</b> night
                                            </Typography>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </NavLink>
                        ))}

                    </div>
                </div>
            </div>


        </>

    );
}