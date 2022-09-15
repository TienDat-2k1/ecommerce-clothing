import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.scss';
const Products = () => {
  return (
    <main className="products container">
      <div className="products__filters">
        <div className="products__filters-l">
          <label htmlFor="category-select">Category</label>
          <select
            autoComplete="value"
            name="category"
            id="category-select"
            defaultValue=""
          >
            <option value="">-- Choose a category --</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div className="products__filters-r">
          <label htmlFor="category-select">Sort by</label>
          <select
            autoComplete="value"
            name="category"
            id="category-select"
            defaultValue=""
          >
            <option value=""></option>
            <option value="dog">A to Z</option>
            <option value="cat">Cat</option>
          </select>
        </div>
      </div>
      <div className="products__grid">
        {/* <ProductCard />
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
        <ProductCard /> */}
      </div>
      <Pagination />
    </main>
  );
};
export default Products;
