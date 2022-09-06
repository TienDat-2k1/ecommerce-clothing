import ProductCard from '../../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import './HomeBestSeller.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const HomeBestSeller = () => {
  return (
    <section className="best-seller">
      <div className="container seller__container">
        <div className="seller-l">
          <h1 className="seller__heading">Best Seller Product</h1>
          <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
          <button className="btn seller__btn">SEE MORE</button>
        </div>
        <div className="seller-r">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
            className="seller__slider-container"
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default HomeBestSeller;
