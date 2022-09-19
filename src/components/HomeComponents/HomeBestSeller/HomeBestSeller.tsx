import ProductCard from '../../Products/ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import axios from 'axios';
import './HomeBestSeller.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { useEffect, useState } from 'react';
import { ProductModel } from '../../../Model/productModel';
import Button from '../../UI/Button/Button';

const HomeBestSeller = () => {
  const [top5Products, setTop5Products] = useState<ProductModel[]>();
  useEffect(() => {
    const fetchTop5BestSeller = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/products?page=1&sort=-saleOff&limit=5'
      );

      setTop5Products(res.data.data.products);
    };
    fetchTop5BestSeller();
  }, []);

  return (
    <section className="best-seller">
      <div className="container seller__container">
        <div className="seller-l">
          <h1 className="seller__heading">Best Seller Product</h1>
          <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
          <Button className="seller__btn">SEE MORE</Button>
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
            {top5Products &&
              top5Products.map(product => {
                return (
                  <SwiperSlide key={product._id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                );
              })}
            {/* <SwiperSlide>
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
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default HomeBestSeller;
