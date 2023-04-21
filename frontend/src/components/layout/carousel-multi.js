import React, { Component } from 'react';
import Slider from 'react-slick';
export default class CarouselMulti extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      prevArrow: <style></style>,
      nextArrow: <style />,
    };
    return (
      <div>
        {/* <h2>Pause On Hover</h2> */}
        <center>
          <Slider {...settings}>
            <div>
              <h3>
                <i className="fa-light fa-house-day"></i>
              </h3>
              <p>House</p>
            </div>
            <div>
              <h3>
                <i className="fa-light fa-cactus"></i>
              </h3>
              <p>Desert</p>
            </div>
            <div>
              <h3>
                <i className="fa-light fa-sailboat"></i>
              </h3>
              <p>Boats</p>
            </div>
            <div>
              <h3>
                <i className="fa-regular fa-fire"></i>
              </h3>
              <p>Trending</p>
            </div>
            <div>
              <h3>
                <i className="fa-regular fa-mountain-sun"></i>
              </h3>
              <p>Mountain</p>
            </div>
            <div>
              <h3>
                <i className="fa-light fa-island-tropical"></i>
              </h3>
              <p>Tropic</p>
            </div>
            <div>
              <h3>
                <i className="fa-regular fa-city"></i>
              </h3>
              <p>City</p>
            </div>
            <div>
              <h3>
                <i className="fa-regular fa-castle"></i>
              </h3>
              <p>Castle</p>
            </div>
          </Slider>
        </center>
      </div>
    );
  }
}
