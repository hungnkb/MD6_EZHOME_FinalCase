import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function CarouselMulti() {
  const items = [
    { id: 1, title: 'Item 1', image: 'https://example.com/image1.jpg' },
    { id: 2, title: 'Item 2', image: 'https://example.com/image2.jpg' },
    { id: 3, title: 'Item 3', image: 'https://example.com/image3.jpg' },
    { id: 4, title: 'Item 4', image: 'https://example.com/image4.jpg' },
    { id: 5, title: 'Item 5', image: 'https://example.com/image5.jpg' },
  ];
  return (
    <>
      <Carousel indicators={false}>
        {items.map((item) => (
          <Carousel.Item key={item.id}>
            <img className="d-block w-100" src={item.image} alt={item.title} />
            <Carousel.Caption>
              <h3>{item.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
