import { Card, CardContent, CardMedia, Typography } from "@mui/material";


//  export default  function TopFive() {
//     return (
//         <>
//             <div className="container">
//                 <h3 style={{textAlign: 'center'}}>Top 5 most rented houses</h3>
//                 <div className="d-flex flex-wrap justify-content-center">
//                     <div className="top-five" style={{marginRight: '30px'}}>
//                         <Card
//                             style={{
//                                 marginLeft: '16px',
//                                 height: '400px',
//                                 width: '200px',
//                                 float: 'left',
//                                 boxShadow: 'none',
//                             }}
//                         >
//                             <CardMedia
//                                 sx={{height: '250px', borderRadius: '7%',}}
//                                 image="https://tuvannhadep.com.vn/uploads/files/hinh-anh-nha-dep-8.jpg"
//                                 title="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     <h5>
//                                         <h5>
//                                             <b> Căn hộ 1PN-Vinhomes Metropoliss</b>
//                                         </h5>
//                                     </h5>

//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                         <Card
//                             style={{
//                                 marginLeft: '16px',
//                                 height: '400px',
//                                 width: '200px',
//                                 float: 'left',
//                                 boxShadow: 'none',
//                             }}
//                         >
//                             <CardMedia
//                                 sx={{height: '250px', borderRadius: '7%',}}
//                                 image="https://nhaachau.com/wp-content/uploads/2018/11/bietthumaitahi1328.jpg"
//                                 title="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     <h5>
//                                         <b> Căn hộ 1PN-Vinhomes Metropoliss</b>
//                                     </h5>
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                         <Card
//                             style={{
//                                 marginLeft: '16px',
//                                 height: '400px',
//                                 width: '200px',
//                                 float: 'left',
//                                 boxShadow: 'none',
//                             }}
//                         >
//                             <CardMedia
//                                 sx={{height: '250px', borderRadius: '7%',}}
//                                 image="https://noithattrevietnam.com/uploaded/Kien-thuc-nha-dep/hinh-anh-nha-2-tang-mai-thai/1-hinh-anh-nha-2-tang-mai-thai.jpg"
//                                 title="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     <h5>
//                                         <b> Căn hộ 1PN-Vinhomes Metropoliss</b>
//                                     </h5>
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                         <Card
//                             style={{
//                                 marginLeft: '16px',
//                                 height: '400px',
//                                 width: '200px',
//                                 float: 'left',
//                                 boxShadow: 'none',
//                             }}
//                         >
//                             <CardMedia
//                                 sx={{height: '250px', borderRadius: '7%',}}
//                                 image="https://phunugioi.com/wp-content/uploads/2020/11/hinh-anh-ngoi-nha-dep-1.jpg"
//                                 title="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     <h5>
//                                         <b> Căn hộ 1PN-Vinhomes Metropoliss</b>
//                                     </h5>
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                         <Card
//                             style={{
//                                 marginLeft: '16px',
//                                 height: '400px',
//                                 width: '200px',
//                                 float: 'left',
//                                 boxShadow: 'none',
//                             }}
//                         >
//                             <CardMedia
//                                 sx={{height: '250px', borderRadius: '7%',}}
//                                 image="https://smarthome.worldtech.vn/wp-content/uploads/2017/10/hinh-ngoi-nha.jpg"
//                                 title="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     <h5>
//                                         <b> Căn hộ 1PN-Vinhomes Metropoliss</b>
//                                     </h5>
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

import React, { Component } from "react";
import Slider from "react-slick";

export default class TopFive extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Top 5 most rented houses</h3>
        <center>
          <Slider {...settings}>
            <div>
              <Card
                style={{
                  height: '400px',
                  width: '300px',
                  float: 'left',
                  boxShadow: 'none',
                }}
              >
                <CardMedia
                  sx={{ height: '250px', borderRadius: '7%', }}
                  image="https://smarthome.worldtech.vn/wp-content/uploads/2017/10/hinh-ngoi-nha.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <h5>
                      <b> Căn hộ 1PN-Vinhomes Metropoliss</b>
                    </h5>
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  height: '400px',
                  width: '300px',
                  float: 'left',
                  boxShadow: 'none',
                }}
              >
                <CardMedia
                  sx={{ height: '250px', borderRadius: '7%', }}
                  image="https://nhaachau.com/wp-content/uploads/2018/11/bietthumaitahi1328.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <h5>
                      <b> Căn hộ 2PN-Vinhomes Metropoliss</b>
                    </h5>
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  height: '400px',
                  width: '300px',
                  float: 'left',
                  boxShadow: 'none',
                }}
              >
                <CardMedia
                  sx={{ height: '250px', borderRadius: '7%', }}
                  image="https://noithattrevietnam.com/uploaded/Kien-thuc-nha-dep/hinh-anh-nha-2-tang-mai-thai/1-hinh-anh-nha-2-tang-mai-thai.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <h5>
                      <b> Căn hộ 3PN-Vinhomes Metropoliss</b>
                    </h5>
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  height: '400px',
                  width: '300px',
                  float: 'left',
                  boxShadow: 'none',
                }}
              >
                <CardMedia
                  sx={{ height: '250px', borderRadius: '7%', }}
                  image="https://smarthome.worldtech.vn/wp-content/uploads/2017/10/hinh-ngoi-nha.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <h5>
                      <b> Căn hộ 4PN-Vinhomes Metropoliss</b>
                    </h5>
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card
                style={{

                  height: '400px',
                  width: '300px',
                  float: 'left',
                  boxShadow: 'none',
                }}
              >
                <CardMedia
                  sx={{ height: '250px', borderRadius: '7%', }}
                  image="https://phunugioi.com/wp-content/uploads/2020/11/hinh-anh-ngoi-nha-dep-1.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <h5>
                      <b> Căn hộ 5PN-Vinhomes Metropoliss</b>
                    </h5>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Slider>
        </center>

      </div>
    );
  }
}
