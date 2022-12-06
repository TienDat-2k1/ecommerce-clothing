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
    sub: `Chương trình giảm giá Thứ Sáu Đen năm 2022 của Best Buy diễn ra từ ngày 20 đến ngày 27 tháng 11`,
  },
  {
    img: hero_2,
    saleOff: 80,
    heading: 'Fall - Winter',
    sub: 'Một nhãn hiệu chuyên nghiệp tạo ra những thứ thiết yếu sang trọng. Được chế tác một cách có đạo đức với cam kết vững chắc về chất lượng vượt trội.',
  },
  {
    img: hero_3,
    saleOff: 40,
    heading: 'Christmas',
    sub: 'Giảm 50% hàng nghìn mẫu áo khoác– Giảm ngay 20% khi khách hàng chọn mua sản phẩm quần',
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
                    Mua ngay
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
