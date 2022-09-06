import ProductCard from '../../ProductCard/ProductCard';
import './HomeProducts.scss';

const HomeProducts = () => {
  return (
    <section className="home-products container">
      <h1 className="home-products__heading">Our Product</h1>
      <div className="home-products__types">
        <h2 className="home-products__type home-products__type--active">hot</h2>
        <h2 className="home-products__type ">on sale</h2>
        <h2 className="home-products__type">trending now</h2>
        <h2 className="home-products__type">new arrival</h2>
      </div>
      <div className="home-products__grid">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <button className="btn home-products__btn">Show more</button>
    </section>
  );
};
export default HomeProducts;
