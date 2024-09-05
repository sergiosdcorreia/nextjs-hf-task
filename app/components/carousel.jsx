"use client"

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

export default function Carousel() {
  const [data, setData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/carousel.json');
        const result = await res.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load carousel data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrevClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev(); // Go to previous slide
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext(); // Go to next slide
    }
  };

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }


  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                className="carousel_img"
                src={item.image}
                alt={item.title}
                width={1940}
                height={1176}
              />
            </SwiperSlide>
          ))}
          <div className="carousel_action-btns">
            <button className="carousel_btn-prev" onClick={handlePrevClick}></button>
            <button className="carousel_btn-next" onClick={handleNextClick}></button>
          </div>
        </Swiper>
        <div className="carousel_subtitle">
          <aside className="carousel_text-visible">
            <p>Name: {data[activeSlide].title}</p>
            <p>Availability: {data[activeSlide].availability}</p>
          </aside>
          <div>
            <p>Location: {data[activeSlide].location}</p>
            <p>Size: {data[activeSlide].size}</p>
          </div>
          <div>
            <p>{data[activeSlide].description}</p>
          </div>
          <button className="carousel_btn-read-more">Read More</button>
        </div>
      </div>
    </section>
  )
}
