import React, { useEffect, useRef, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../../img/img1.jpg'
import img2 from '../../img/img2.jpg'
import img3 from '../../img/img3.jpg'
import img4 from '../../img/img4.jpg'
import './Banner.css'
import { useDispatch, useSelector } from 'react-redux';
import { setSlideEffect } from '../../Redux/slideEffectReducer';

function Banner() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

const slideEffect=useSelector(state=>state.slideEffect.value)
const dispatch=useDispatch();
  setTimeout(() => {
    dispatch(setSlideEffect(false))
  }, 1000);

  return (
    <div className='banner'  style={{animation:slideEffect?" 1s animate":""}}>
      <Slider {...settings} >
        <img className='banner-img' src={img1} alt="" />
        <img className='banner-img' src={img2} alt="" />
        <img className='banner-img' src={img3} alt="" />
        <img className='banner-img' src={img4} alt="" />
      </Slider>
    </div>
  )
}

export default Banner