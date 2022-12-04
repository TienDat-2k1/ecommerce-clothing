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
            <span>Hình ảnh</span>
          </div>
          <div className="product__header-block col c-3 sm-4">
            <span>Tên</span>
          </div>
          <div className="product__header-block col c-2  sm-0">
            <span>Chất liệu</span>
          </div>
          <div className="product__header-block col c-1 md-0">
            <span>Kích cỡ</span>
          </div>
          <div className="product__header-block col c-1 sm-2">
            <span>Khuyến mãi</span>
          </div>
          <div className="product__header-block col c-1 sm-0">
            <span>Đánh giá</span>
          </div>
          <div className="product__header-block col c-1 sm-0">
            <span>Giá</span>
          </div>
          <div className="product__header-block col c-1 sm-3">
            <span>Lượt bán</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderProductBlock;
