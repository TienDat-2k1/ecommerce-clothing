import React, { useState } from 'react';
import Tippy from '@tippyjs/react';

import AdminOrdersModal from '../../components/ModalComponent/AdminOrdersModal/AdminOrdersModal';
import { OrderModel, StatusOrder } from '../../utils/types';
import { currencyFormat } from '../../utils/currencyFormat';

type AdminOrderItemProps = {
  date: string;
  time: string;
  order: OrderModel;
  onUpdate: () => void;
};

const AdminOrderItem = ({
  date,
  time,
  order,
  onUpdate,
}: AdminOrderItemProps) => {
  const [isOrderModal, setIsItemModal] = useState(false);

  const showOrderModal = () => {
    setIsItemModal(true);
  };

  const hideOrderModal = () => {
    setIsItemModal(false);
  };

  return (
    <>
      <div className="admin-order__item" onClick={showOrderModal}>
        <div className="admin-order__content admin-order__content-created">
          <span>{date}</span>
          <span>{time}</span>
        </div>
        <div className="admin-order__content admin-order__content-customer">
          <span>Customer</span>
          <h4>{order.customer.name} </h4>
        </div>
        <div className="admin-order__content">
          <span>Phone</span>
          <span>{order.phone} </span>
        </div>
        <div className="admin-order__content">
          <span>Products</span>
          <div className="admin-order__products">
            {order.items.map((item, i) => {
              return (
                <div key={i} className="admin-order__product">
                  <div className="admin-order__product-name">
                    <Tippy content={<span>{item.product?.name}</span>}>
                      <h4>{item.product?.name}</h4>
                    </Tippy>
                  </div>
                  <div className="admin-order__product-options">
                    <span>{item.size}</span>
                    <span>x{item.quantity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="admin-order__content">
          <span>Status</span>
          <div
            className={`admin-order__status ${
              order.status !== 'Receive order' ? order.status.toLowerCase() : ''
            }`}
          >
            <div></div>
            <span
              style={{
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {StatusOrder[order.status as keyof typeof StatusOrder]}
            </span>
          </div>
        </div>
        <div className="admin-order__content">
          <span>Price</span>
          <span>{currencyFormat(order.totalPrice)}</span>
        </div>
      </div>

      {isOrderModal && (
        <AdminOrdersModal
          onClose={hideOrderModal}
          data={order}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};
export default React.memo(AdminOrderItem);
