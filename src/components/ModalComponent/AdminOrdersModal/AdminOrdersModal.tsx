import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import { OrderModel } from '../../../Model/orderModel';
import imageProduct from '../../../utils/imageProduct';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import './AdminOrdersModal.scss';

type AdminOrdersModalProps = {
  data: OrderModel;
  onClose: () => void;
  onUpdate: () => void;
};

const status = ['Receive order', 'Pending', 'Shipped', 'Cancelled', 'Return'];

const AdminOrdersModal = ({
  data,
  onClose,
  onUpdate,
}: AdminOrdersModalProps) => {
  const axiosPrivate = useAxiosPrivate();
  const [orderStatus, setOrderStatus] = useState();

  const dateTime = new Intl.DateTimeFormat('vn-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(data.createAt));

  const [date, time] = dateTime.split(', ');

  const saveStatus = async () => {
    try {
      const res = await axiosPrivate.patch(`orders/${data._id}`, {
        status: orderStatus,
      });

      if (res.status === 200) {
        toast.success('saved');
        onUpdate();
        onClose();
      }
    } catch (error) {}
  };

  return (
    <Modal onClose={onClose} className="admin-order-modal">
      <div className="order-modal__content">
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className="order-modal__content">
        <span>Status</span>
        <Multiselect
          options={status}
          selectedValues={[data.status]}
          isObject={false}
          singleSelect
          customCloseIcon={<></>}
          onSelect={e => {
            const [status] = e;
            setOrderStatus(status);
          }}
        />
      </div>
      <div className="order-modal__content">
        <span>Customer</span>
        <span>{data.customer.name}</span>
      </div>
      <div className="order-modal__content">
        <span>Phone Number</span>
        <span>{data.phone}</span>
      </div>
      <div className="order-modal__content order-modal__orders">
        <span>Order</span>
        <div className="order-modal__list">
          {data.items.map((item, i) => (
            <div key={i} className="order-modal__order">
              <img src={imageProduct(item.product.imageCover)} alt="" />
              <h4>{item.product.name}</h4>
              <div>
                <span>{item.size}</span>
                <span>x{item.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="order-modal__content">
        <span>Total Price</span>
        <span>{data.totalPrice}</span>
      </div>
      {orderStatus && (
        <div className="order-modal__cta">
          <Button className="btn--round btn--outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button className="btn--round btn--blue" onClick={saveStatus}>
            Save
          </Button>
        </div>
      )}
    </Modal>
  );
};
export default React.memo(AdminOrdersModal);
