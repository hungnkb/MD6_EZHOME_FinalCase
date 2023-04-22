import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        url: process.env.REACT_APP_BASE_URL + '/homes/top?top=5'
      }).then(response => {
        setDataList(response.data)
      }).catch(err)
    };
    getData();
  }, []);
  console.log(dataList[0]);
  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Top 5 most rented houses</h3>
      <center>
        {dataList.length > 0 ? (<div>
          <Slider {...settings}>
            {dataList.map((data, index) => {
              return (<div key={index} onClick={() => {navigate(`/detail-home/${data.idHome}`)}}>
                <Card
                  style={{
                    height: '400px',
                    width: '300px',
                    float: 'left',
                    boxShadow: 'none',
                  }}
                >
                  <CardMedia
                    sx={{ height: '250px', borderRadius: '7%' }}
                    image={data.images[0].urlHomeImage}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <h5>
                        <b>{data.title}</b>
                      </h5>
                    </Typography>
                  </CardContent>
                </Card>
              </div>)
            })}
          </Slider>

        </div>) : null
        }
      </center>
    </>
  );
}