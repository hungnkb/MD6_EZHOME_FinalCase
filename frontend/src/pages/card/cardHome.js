import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselMulti from '../../components/layout/carousel-multi';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TopFive from './topFive';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CardHome(props) {
  const [home, setHome] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [pageHome, setPageHome] = useState(0);
  const { loading = false } = props;

  let location = useLocation();

  useEffect(() => {
    if (location.state?.data.length > 0) {
      setHome(location.state.data);
      setIsFetchData(false);
    } else {
      setHome([]);
      // setIsNothingFound(true);
      setIsFetchData(true);
    }
  }, [location.state?.data]);

  useEffect(() => {
    if (isFetchData) {
      let page = pageHome + 1;
      let option = { params: { page } };
      axios.get('http://localhost:3002/api/v1/homes', option).then((res) => {
        setHome([...home, ...res.data]);
        setIsFetchData(false);
      });
    }
  }, [isFetchData]);
  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-12">
            <CarouselMulti />
          </div>
        </div>
        <br />

        <TopFive />
        <div style={{ marginTop: '70px' }}>
          <InfiniteScroll
            className="d-flex flex-wrap justify-content-center"
            dataLength={1000} //This is important field to render the next data
            next={() => setIsFetchData(true)}
            hasMore={true}
          >
            {home.length > 0 ? (
              home.map((value, index) => {
                if (value.status) {
                  return (
                    <div>
                      <NavLink
                        key={index}
                        to={`/detail-home/${value.idHome}`}
                        style={{
                          marginRight: '20px',
                          width: '256px',
                          display: 'inline-block',
                          textDecoration: 'none',
                        }}
                      >
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
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                <b> {value.title}</b>
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {value.address}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                <b>{value.price.toLocaleString('en-EN')}đ</b>{' '}
                                night
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </NavLink>
                    </div>
                  );
                } else {
                  return '';
                }
              })
            ) : (
              <>
                <Stack direction="row" spacing={5} sx={{ marginTop: '50px' }}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={256}
                    height={250}
                    sx={{ borderRadius: '15px' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={256}
                    height={250}
                    sx={{ borderRadius: '15px' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={256}
                    height={250}
                    sx={{ borderRadius: '15px' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={256}
                    height={250}
                    sx={{ borderRadius: '15px' }}
                  />
                </Stack>
              </>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
