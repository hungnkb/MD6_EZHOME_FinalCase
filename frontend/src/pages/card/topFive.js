import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './style.css';

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};

export default function defaultTopFive() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      axios({
        method: 'get',
        url: process.env.REACT_APP_BASE_URL + '/homes/top?top=5',
      })
        .then((response) => {
          setDataList(response.data);
        })
        .catch((err) => {});
    };
    getData();
  }, []);
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <h3
          style={{
            textAlign: 'center',
            marginBottom: '50px',
            color: '#f7a800',
            marginRight: '0.4rem',
          }}
        >
          TOP 5
        </h3>
        <h3>TO DISCOVER</h3>
      </div>
      <div>
        {dataList.length > 0 ? (
          <div id="topfife-slider">
            <Slider {...settings}>
              {dataList.map((data, index) => {
                return (
                  <div key={index}>
                    <Card
                      style={{
                        height: '100%',
                        width: '90%',
                        float: 'left',
                        boxShadow: 'none',
                      }}
                    >
                      <CardMedia
                        sx={{ height: '250px', borderRadius: '7%' }}
                        image={data.images[0].urlHomeImage}
                        title="top 5 house "
                      />
                      <CardContent>
                        <Typography
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`/detail-home/${data.idHome}`);
                          }}
                          gutterBottom
                          variant="h5"
                          component="div"
                        >
                          <h5>
                            <b>{data.title}</b>
                          </h5>
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </Slider>
          </div>
        ) : null}
      </div>
    </>
  );
}
