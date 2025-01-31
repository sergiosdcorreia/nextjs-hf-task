"use client"

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import gsap from 'gsap';
import LoadingCarousel from './loading/loadingCarousel';
import 'swiper/scss';

export default function Carousel() {
  const [data, setData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);
  const swiperRef = useRef(null);
  const accordionRef = useRef(null);
  const mouseRef = useRef({
    x: 0,
    y: 0
  });
  const textPrevRef = useRef();
  const textNextRef = useRef();

  useEffect(() => {
    // Fetch carousel data from local JSON file
    const fetchData = async () => {
      try {
        const res = await fetch('/data/carousel.json');
        const result = await res.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load carousel data:', error);
        setIsLoading(false);
      }
    };
    fetchData();

    // Carousel text custom cursor
    const manageMouseMove = (e) => {
      const { clientX, clientY } = e;

      mouseRef.current = {
        x: clientX,
        y: clientY
      }
      moveText(mouseRef.current.x, mouseRef.current.y)
    };

    const moveText = (x, y) => {
      gsap.set(textPrevRef.current, {x, y, xPercent: -50, yPercent: -50})
      gsap.set(textNextRef.current, {x, y, xPercent: -50, yPercent: -50})
    };

    let ctx = gsap.context(() => {
      window.addEventListener("mousemove", manageMouseMove);
    })

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", manageMouseMove);
    }
  }, []);

  // Read more accordion
  const toggleReadMore = () => {
    setIsShowing(!isShowing);
  }

  // Carousel overiding swipes with clicks for desktop
  const handlePrevClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <article className="carousel">
      { isLoading ? <LoadingCarousel /> :
        <>
          <h2 className="article_title">{data[activeSlide].title}</h2>
          <div ref={textPrevRef} style={{ opacity: isPrevHovered ? '1' : '0' }} className="carousel_cursor-prev" />
          <div ref={textNextRef} style={{ opacity: isNextHovered ? '1' : '0' }} className="carousel_cursor-next" />
          <figure className="carousel-container">
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
                <button
                  onMouseEnter={() => {setIsPrevHovered(true)}}
                  onMouseLeave={() => {setIsPrevHovered(false)}}
                  className="carousel_btn-prev"
                  onClick={handlePrevClick}
                ></button>
                <button
                  onMouseEnter={() => {setIsNextHovered(true)}}
                  onMouseLeave={() => {setIsNextHovered(false)}}
                  className="carousel_btn-next"
                  onClick={handleNextClick}
                ></button>
              </div>
            </Swiper>
            <figcaption className="carousel_caption">
              <div className="carousel_text-visible">
                <p className="carousel_title">Name: {data[activeSlide].title}</p>
                <p className="carousel_availability">Availability: {data[activeSlide].availability}</p>
              </div>
              <div style={{ height: isShowing ? accordionRef.current?.offsetHeight || 0 : "0" }} className="carousel_accordion">
                <div ref={accordionRef}>
                  <div className="carousel_accordion_row">
                    <p>Location: {data[activeSlide].location}</p>
                    <p>Size: {data[activeSlide].size}</p>
                  </div>
                  <div className="carousel_accordion_description">
                    <p>{data[activeSlide].description}</p>
                  </div>
                </div>
              </div>
              <button className="carousel_btn-read-more" type="button" onClick={toggleReadMore}>{isShowing ? 'Hide Text' : 'Read More'}</button>
            </figcaption>
          </figure>
        </>
      }
    </article>
  )
}
