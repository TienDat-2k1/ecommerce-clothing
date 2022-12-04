import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/scss';

import * as productServices from '../../../services/productServices';
import Button from '../../UI/Button/Button';
import './HomeBestSeller.scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import ProductCard from '../../Products/ProductCard/ProductCard';
import { ProductModel } from '../../../utils/types';

const HomeBestSeller = () => {
  const [top5Products, setTop5Products] = useState<ProductModel[]>();
  useEffect(() => {
    const fetchTop5BestSeller = async () => {
      const res = await productServices.getAllProduct({
        page: 1,
        sort: '-saleOff',
        limit: 5,
      });

      setTop5Products(res.data.data);
    };
    fetchTop5BestSeller();
  }, []);

  return (
    <section className="best-seller">
      <div className="container seller__container">
        <div className="seller-l">
          <h1 className="seller__heading">Sản phẩm bán chạy</h1>
          <span>
            Thời trang bán chạy nhất luôn thay đổi để đáp ứng với tin tức, sự
            kiện, xu hướng xã hội.
          </span>
          <Button
            as={Link}
            to="/products"
            className="btn--outline-white btn--shadow"
          >
            Xem thêm
          </Button>
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
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default HomeBestSeller;
