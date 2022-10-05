const HeaderProductBlock = () => {
  return (
    <div className="admin-product-wrapper row">
      <div className="col c-1 md-2">
        <div className="row">
          <div className="product__header-block col c-6"></div>
          <div className="product__header-block col c-6"></div>
        </div>
      </div>
      <div className="col c-11 md-10">
        <div className="row">
          <div className="product__header-block col c-2 md-3">
            <span>Image</span>
          </div>
          <div className="product__header-block col c-3 sm-4">
            <span>Name</span>
          </div>
          <div className="product__header-block col c-2  sm-0">
            <span>Material</span>
          </div>
          <div className="product__header-block col c-1 md-0">
            <span>Sizes</span>
          </div>
          <div className="product__header-block col c-1 sm-2">
            <span>Sale Off</span>
          </div>
          <div className="product__header-block col c-1 sm-0">
            <span>Rating</span>
          </div>
          <div className="product__header-block col c-1 sm-0">
            <span>Price</span>
          </div>
          <div className="product__header-block col c-1 sm-3">
            <span>Sold</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderProductBlock;
