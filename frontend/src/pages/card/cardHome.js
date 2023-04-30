import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselMulti from '../../components/layout/carousel-multi';
import TopFive from './topFive';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CardHome(props) {
  const [home, setHome] = useState([]);
  const [searchHomeList, setSearchHomeList] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);
  const [pageHome, setPageHome] = useState(0);
  const { loading = false } = props;
  const [openDescription, setOpenDescription] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (location.state?.data.length > 0) {
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
      let page = pageHome + 1;
      setPageHome(page);
      let option = { params: { page } };
      axios.get('http://localhost:3002/api/v1/homes', option).then((res) => {
        setHome([...home, ...res.data]);
        setIsFetchData(false);
      });
    }
  }, [isFetchData]);
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
              dataLength={1000} //This is important field to render the next data
              next={() => setIsFetchData(true)}
              hasMore={true}
            >
              {home.map((value, index) => {
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
                                <del>
                                  {value.price.toLocaleString('en-EN')}đ
                                </del>
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                <div className="row">
                                  <div className="col-8">
                                    <b>
                                      {value.price.toLocaleString('en-EN')}đ
                                    </b>
                                    night
                                  </div>
                                  <div className="col-4">
                                    <b style={{ color: 'red' }}>-30%</b>
                                  </div>
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
          ) : (
            <div></div>
          )}
          {searchHomeList.length > 0 ? (
            <div
              className="d-flex flex-wrap justify-content-center"
              dataLength={1000} //This is important field to render the next data
              next={() => setIsFetchData(true)}
              hasMore={true}
            >
              {searchHomeList.map((value, index) => {
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
                                <b
                                // style={{
                                //   whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'

                                // }}
                                >
                                  {value.title}
                                </b>
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
