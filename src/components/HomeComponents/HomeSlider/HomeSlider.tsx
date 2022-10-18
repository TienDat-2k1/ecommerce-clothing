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
    sub: '',
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
    heading: 'Black Friday',
    sub: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.',
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
        {sliders.map(slide => {
          return (
            <SwiperSlide>
              <div className="home-slide">
                <img src={slide.img} alt="" />
                <div className="home-slide__contents">
                  <h2>{slide.heading}</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloremque, maxime? Fugit ducimus dolore corrupti ea! Sequi,
                    debitis aut. Ducimus, enim natus cum placeat error vel
                    perferendis vero officia dolorum provident.
                  </p>
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
