import './DetailProduct.scss';

const DetailProduct = () => {
  return (
    <main className="product container">
      <div className="product__main">
        <div className="product__image">
          <img
            src="https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt=""
          />
        </div>
        <div className="product__details">
          <h1 className="product__name">
            Áo Thun Cổ Trụ Y Nguyên Bản 18+ Ver61
          </h1>
          <div className="product__material">
            <span>Material:</span>
            <span>Poly</span>
          </div>
          <div className="product__price">
            <span className="product__price-origin">$425</span>
            <span className="product__price-sale">$300</span>
          </div>
          <div className="product__size">
            <span>Size: </span>
            <kbd className="active">S</kbd>
            <kbd>M</kbd>
            <kbd>XL</kbd>
            <kbd>XLL</kbd>
          </div>
          <div className="product__color">
            <span>Color: </span>
            <span className="active" style={{ backgroundColor: 'red' }}></span>
            <span style={{ backgroundColor: 'blue' }}></span>
          </div>
          <div className="product__quantity">
            <span>Quantity:</span>
            <span>-</span>
            <span>1</span>
            <span>+</span>
          </div>
          <button className="btn product__btn">Add to cart</button>
        </div>
      </div>
      <div className="product__description">
        <h2>Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore rem
          harum esse soluta quas placeat consequuntur eius nihil ipsam, porro
          natus recusandae repellendus assumenda, consectetur quidem
          reprehenderit et, cum sapiente?
        </p>
      </div>
    </main>
  );
};
export default DetailProduct;
