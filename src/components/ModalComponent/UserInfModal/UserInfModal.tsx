import { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import { setUser } from '../../../store/user/userSlice';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import './UserInfModal.scss';
import {
  Address,
  District,
  Division,
  Province,
  UserModel,
  Ward,
} from '../../../utils/types';
import Select from 'react-select';
import { getAllDivisions } from '../../../services/addressServices';

type UserInfModalProps = {
  data: UserModel;
  onClose: () => void;
};

const inputs = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  {
    id: 2,
    name: 'name',
    type: 'text',
    label: 'Tên hiển thị',
    required: true,
  },
  {
    id: 3,
    name: 'phone',
    type: 'text',
    label: 'Số điện thoại',
    pattern: '^[0-9]{10}',
    errorMessage: 'Chỉ nhập số!!',
    required: true,
  },
];

type InputUser = {
  email: string;
  name: string;
  phone?: string;
  address?: string;
};

type UserAddress = {
  address: string;
} & Address;

const UserInfModal = ({ data, onClose }: UserInfModalProps) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { email, name, address, phone } = data;
  const [inputUser, setInputUser] = useState<InputUser>({
    email,
    name,
    phone,
  });
  const [divisions, setDivisions] = useState<Division>({
    provinces: [],
    districts: [],
    wards: [],
  });

  const [userAddress, setUserAddress] = useState<UserAddress>(
    {} as UserAddress
  );

  useEffect(() => {
    if (!address) return;
    const userAdd = address.split(', ');
    const provinces = divisions.provinces.find(p => p.name === userAdd[3]);
    const districts = divisions.districts.find(p => p.name === userAdd[2]);
    const wards = divisions.wards.find(p => p.name === userAdd[1]);

    if (provinces && districts && wards)
      setUserAddress({ provinces, districts, wards, address: userAdd[0] });
  }, [address, divisions]);

  useEffect(() => {
    getAllDivisions()
      .then(data => {
        setDivisions(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputUser({ ...inputUser, [name]: value });
  };

  const validate = useMemo(() => {
    const { email, name, phone } = inputUser;
    return !!(email.length, name.length, phone?.length === 10);
  }, [inputUser]);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate) return;

    try {
      const { address, districts, provinces, wards } = userAddress;
      const add = [address, wards.name, districts.name, provinces.name].join(
        ', '
      );
      const data = { ...inputUser, address: add };
      const res = await axiosPrivate.patch('user/updateMe', data);

      if (res.status === 200) {
        toast.success('Success!!');
        dispatch(setUser(res.data.data.user));
        onClose();
      }
    } catch (error) {}
  };

  return (
    <Modal className="user-inf-modal" onClose={onClose}>
      <h4>Nhập thông tin của bạn</h4>

      <form onSubmit={formSubmitHandler}>
        <div className="user-inf-modal__inputs">
          <div>
            {inputs.map(input => {
              const { id, ...inputProps } = input;
              return (
                <FormInput
                  key={input.id}
                  {...inputProps}
                  value={
                    '' +
                    (inputUser[input.name as keyof InputUser]
                      ? inputUser[input.name as keyof InputUser]
                      : '')
                  }
                  onChange={inputChangeHandler}
                />
              );
            })}
          </div>
          <div>
            <span>Địa chỉ</span>
            <Select
              className="order__form-select"
              value={userAddress.provinces}
              options={divisions.provinces}
              getOptionLabel={(p: Province) => {
                return p.name;
              }}
              getOptionValue={(p: Province) => {
                return p.code.toString();
              }}
              onChange={selectOption => {
                setUserAddress(prev => ({
                  ...prev,
                  provinces: selectOption as Province,
                }));
              }}
              placeholder="Chọn tỉnh thành"
            />
            <Select
              className="order__form-select"
              value={userAddress.districts}
              isDisabled={!userAddress.provinces}
              options={
                userAddress.provinces
                  ? (divisions.districts.filter(
                      d => d.province_code === userAddress.provinces.code
                    ) as any)
                  : []
              }
              getOptionLabel={(p: District) => {
                return p.name;
              }}
              getOptionValue={(p: District) => {
                return p.code.toString();
              }}
              onChange={selectOption => {
                setUserAddress(prev => ({
                  ...prev,
                  districts: selectOption as District,
                }));
              }}
              placeholder="Chọn quận huyện"
            />
            <Select
              className="order__form-select"
              value={userAddress.wards}
              isDisabled={!userAddress.districts}
              options={
                userAddress.districts
                  ? (divisions.wards.filter(
                      w => w.district_code === userAddress.districts.code
                    ) as any)
                  : []
              }
              getOptionLabel={(p: Ward) => {
                return p.name;
              }}
              getOptionValue={(p: Ward) => {
                return p.code.toString();
              }}
              onChange={selectOption => {
                setUserAddress(prev => ({
                  ...prev,
                  wards: selectOption as Ward,
                }));
              }}
              placeholder="Chọn xã phường"
            />
            <FormInput
              disabled={!userAddress.wards}
              value={userAddress.address}
              onChange={e => {
                setUserAddress(prev => ({ ...prev, address: e.target.value }));
              }}
              type="text"
              label="Địa chỉ"
              style={{ margin: 0 }}
            />
          </div>
        </div>
        <div className="user-inf-modal__cta">
          <Button
            type="button"
            className="btn--round btn--outline btn--shadow"
            onClick={onClose}
          >
            Hủy bỏ
          </Button>
          <Button
            className="btn--round btn--outline btn--shadow btn--blue"
            disabled={!validate}
          >
            Lưu
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default UserInfModal;
