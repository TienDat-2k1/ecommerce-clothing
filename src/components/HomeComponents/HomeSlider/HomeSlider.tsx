import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import hero_1 from '../../../assets/img/hero-1.png';
import hero_2 from '../../../assets/img/hero-2.png';
import hero_3 from '../../../assets/img/hero-3.png';
import './HomeSlider.scss';
import { EffectFade, Pagination, Navigation, Autoplay } from 'swiper';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';

const sliders = [
  {
    img: hero_1,
    saleOff: 50,
    heading: 'Black Friday',
    sub: `Best Buy's 2022 Black Friday sale runs from Nov. 20 to 27. During this time, you can find deals on everything. Best Buy stores will be closed for Thanksgiving Day, but open bright and early at 5 a.m. on Black Friday.`,
  },
  {
    img: hero_2,
    saleOff: 80,
    heading: 'Fall - Winter',
    sub: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.',
  },
  {
    img: hero_3,
    saleOff: 40,
    heading: 'Christmas',
    sub: '50% off thousands of premium designer jackets, wools, spandexes and shirts. – Get 20% off when customers choose to buy Veston products, casual pants.',
  },
];

const HomeSlider = () => {
  return (
    <div className="home-slider-container">
      <Swiper
        effect={'fade'}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        className="home-slider"
      >
        {sliders.map((slide, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="home-slide">
                <img src={slide.img} alt="" />
                <div className="home-slide__contents">
                  <h2>{slide.heading}</h2>
                  <p>{slide.sub}</p>
                  <Button
                    as={Link}
                    to="products"
                    className="btn--shadow btn--yellow "
                  >
                    SHOP NOW
                  </Button>
                </div>
                <div className="home-slide__sale">
                  <span>SALE</span>
                  <span>{slide.saleOff}%</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default HomeSlider;
