import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselMulti from '../../components/layout/carousel-multi';
import TopFive from './topFive';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from '@mui/material/Skeleton';

export default function CardHome(props) {
  const [home, setHome] = useState([]);
  const [searchHomeList, setSearchHomeList] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);
  const [pageHome, setPageHome] = useState(1);
  const { loading = false } = props;
  const [openDescription, setOpenDescription] = useState(false);
  const [skeleton, setSkeleton] = useState([1, 2, 3, 4, 5, 6]);
  const [hasmore, sethasmore] = useState(true);

  let location = useLocation();

  useEffect(() => {
    if (location.state?.data.length > 0) {
      setHome([]);
      setSearchHomeList(location.state.data);
      window.history.replaceState({}, document.title);
      setIsFetchData(false);
    } else {
      setHome([]);
      setPageHome(0);
      setIsFetchData(true);
    }
  }, [location.state?.data]);

  useEffect(() => {
    if (isFetchData) {
      setSearchHomeList([]);
      let page = 1;
      setPageHome(page);
      let option = { params: { page } };
      axios.get('http://localhost:3002/api/v1/homes', option).then((res) => {
        if (res.data.length == 12) {
          sethasmore(true);
        } else if (res.data.length < 12) {
          sethasmore(false);
        }
        setHome(res.data);
        setIsFetchData(false);
      });
    }
  }, [isFetchData]);

  const handleNextPage = () => {
    let page = pageHome + 1;
    setPageHome(page);
    let option = { params: { page } };
    axios.get('http://localhost:3002/api/v1/homes', option).then((res) => {
      if (res.data.length == 12) {
        sethasmore(true);
      } else if (res.data.length < 12) {
        sethasmore(false);
      }
      console.log('zooo');
      setHome([...home, ...res.data]);
      setIsFetchData(false);
    });
  };

  return (
    <>
      <div style={{ marginLeft: '20px' }}>
        <br />
        <CarouselMulti />
        <br />
        {searchHomeList.length === 0 && <TopFive />}
        <div style={{ marginTop: '70px' }}>
          {home.length > 0 && searchHomeList.length == 0 ? (
            <InfiniteScroll
              className="d-flex flex-wrap justify-content-center"
              dataLength={home.length} //This is important field to render the next data
              next={handleNextPage}
              hasMore={hasmore}
            >
              {home.map((value, index) => {
                let flagCouponCheck = false;
                let priceWithCoupon = 0;
                if (value.status) {
                  if (value.idCoupon) {
                    const currentDate = new Date();
                    const startDate = new Date(
                      Date.parse(value.idCoupon.startDate),
                    );
                    const endDate = new Date(
                      Date.parse(value.idCoupon.endDate),
                    );
                    if (currentDate >= startDate && currentDate <= endDate) {
                      priceWithCoupon =
                        value.price -
                        (value.price * value.idCoupon.value) / 100;
                      flagCouponCheck = true;
                    }
                  }
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
                            textAlign: 'left',
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
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                {value.title.length <= 25 ? (
                                  <>
                                    <b> {value.title}</b>
                                  </>
                                ) : (
                                  <>
                                    <b> {value.title.slice(0, 25)}...</b>
                                  </>
                                )}
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
                                {flagCouponCheck ? (
                                  <del>
                                    {value.price.toLocaleString('en-EN')}đ
                                  </del>
                                ) : (
                                  <b>{value.price.toLocaleString('en-EN')}đ</b>
                                )}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                <div className="row">
                                  {flagCouponCheck ? (
                                    <div className="col-8">
                                      <b>
                                        {priceWithCoupon.toLocaleString(
                                          'en-EN',
                                        )}
                                        đ
                                      </b>
                                      night
                                    </div>
                                  ) : null}
                                  {flagCouponCheck ? (
                                    <div className="col-4">
                                      <b style={{ color: 'red' }}>
                                        -{value.idCoupon.value}%
                                      </b>
                                    </div>
                                  ) : null}
                                </div>
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
              })}
            </InfiniteScroll>
          ) : home.length == 0 && searchHomeList.length == 0 ? (
            <Stack
              spacing={1}
              direction="row"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              {skeleton.map((index) => (
                <div>
                  <Skeleton
                    key={`ske${index}`}
                    variant="rectangular"
                    width="256px"
                    height="250px"
                    style={{ borderRadius: '7%' }}
                  >
                    <div style={{ paddingTop: '57%' }} />
                  </Skeleton>
                  <Skeleton width="256px">
                    <Typography>.</Typography>
                  </Skeleton>
                  <Skeleton width="256px">
                    <Typography>.</Typography>
                  </Skeleton>
                  <Skeleton width="256px">
                    <Typography>.</Typography>
                  </Skeleton>
                </div>
              ))}
            </Stack>
          ) : null}
          {searchHomeList.length > 0 ? (
            <div
              className="d-flex flex-wrap justify-content-center"
              dataLength={searchHomeList.length}
              next={handleNextPage}
              hasMore={hasmore}
            >
              {searchHomeList.map((value, index) => {
                if (value.status) {
                  return (
                    <div key={`${value - index}`}>
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
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                <b>{value.title}</b>
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
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
