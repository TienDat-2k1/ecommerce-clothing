import { GrUpdate } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

import './AdminProductItem.scss';

const AdminProductItem = () => {
  return (
    <div className="admin-product-item row">
      <div className="col c-1">
        <div className="row">
          <div className="admin-product-content admin-product-cta col c-6">
            <GrUpdate />
          </div>
          <div className="admin-product-content admin-product-cta  col c-6">
            <RiDeleteBin6Line />
          </div>
        </div>
      </div>
      <div className="col c-11">
        <div className="row">
          <div className="admin-product-content admin-product__image  col c-2">
            <img
              src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80"
              alt=""
            />
          </div>
          <div className="admin-product-content admin-product__name  col c-3">
            <h4>
              The numbers in the table specify the first browser version that
              fully supports the property. Numbers followed by -o- specify the
              first version that worked with a prefix.
            </h4>
          </div>
          <div className="admin-product-content  col c-1">
            <span>Cotton</span>
          </div>
          <div className="admin-product-content  col c-2">
            <span>L, XL, XXL</span>
          </div>
          <div className="admin-product-content  col c-1">
            <span>90%</span>
          </div>
          <div className="admin-product-content  col c-1">
            <span>3.6</span>
          </div>
          <div className="admin-product-content  col c-1">
            <span>$99</span>
          </div>
          <div className="admin-product-content  col c-1">
            <span>99</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProductItem;
