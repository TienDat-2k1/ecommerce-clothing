import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { BiMap } from 'react-icons/bi';

import imageProduct from '../../../utils/imageProduct';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import './AdminOrdersModal.scss';
import { OrderModel, StatusOrder } from '../../../utils/types';
import { currencyFormat } from '../../../utils/currencyFormat';
import { AiOutlinePhone } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa';
import Select from 'react-select';

type AdminOrdersModalProps = {
  data: OrderModel;
  onClose: () => void;
  onUpdate: () => void;
};

const status = [
  { value: 'Receive order', label: 'Tiếp nhận đơn hàng' },
  { value: 'Confirm', label: 'Xác nhận đơn hàng' },
  { value: 'Shipping', label: 'Đang vận chuyển' },
  { value: 'Success', label: 'Giao hàng thành công' },
  { value: 'Cancelle', label: 'Hủy đơn hàng' },
  { value: 'Return', label: 'Đổi trả' },
];

const AdminOrdersModal = ({
  data,
  onClose,
  onUpdate,
}: AdminOrdersModalProps) => {
  const axiosPrivate = useAxiosPrivate();
  const [orderStatus, setOrderStatus] = useState<keyof typeof StatusOrder>();

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
    } catch (error: any) {
      const message = error.response.data.message;
      message && toast.warning(message);
    }
  };

  return (
    <Modal onClose={onClose} className="admin-order-modal">
      <div className="order-modal__content">
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className="order-modal__content">
        <span>Trạng thái</span>

        <Select
          options={status}
          value={{
            label: StatusOrder[
              data.status as keyof typeof StatusOrder
            ] as string,
            value: data.status,
          }}
          onChange={e => {
            if (!e?.value) return;
            setOrderStatus(e?.value as keyof typeof StatusOrder);
          }}
        />

        {/* <Multiselect
          options={status}
          selectedValues={[data.status]}
          isObject={false}
          singleSelect
          customCloseIcon={<></>}
          onSelect={e => {
            const [status] = e;
            setOrderStatus(status);
          }}
        /> */}
      </div>
      <div className="order-modal__content">
        <span>
          <FaUserTie /> Khách hàng
        </span>
        <span>{data.customer.name}</span>
      </div>
      <div className="order-modal__content">
        <span>
          <AiOutlinePhone /> Số điện thoại
        </span>
        <span>{data.phone}</span>
      </div>
      <div className="order-modal__content">
        <span>
          <BiMap /> Địa chỉ
        </span>
        <span>{data.address}</span>
      </div>
      <div className="order-modal__content order-modal__orders">
        <span>Đơn hàng</span>
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
        <span>Tổng tiền hàng</span>
        <span>{currencyFormat(data.totalPrice)}</span>
      </div>
      {orderStatus && (
        <div className="order-modal__cta">
          <Button className="btn--round btn--outline" onClick={() => onClose()}>
            Hủy
          </Button>
          <Button className="btn--round btn--blue" onClick={saveStatus}>
            Lưu
          </Button>
        </div>
      )}
    </Modal>
  );
};
export default React.memo(AdminOrdersModal);
