import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import { setUser } from '../../../store/user/userSlice';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import './UserInfModal.scss';
import { UserModel } from '../../../utils/types';

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
    label: 'Name',
    required: true,
  },
  {
    id: 3,
    name: 'phone',
    type: 'text',
    label: 'Phone number',
    pattern: '^[0-9]{10}',
    errorMessage: 'Please enter just number!!',
    required: true,
  },
  {
    id: 4,
    name: 'address',
    type: 'text',
    label: 'Address',
    errorMessage: 'Not empty!',
    required: true,
  },
];

type InputUser = {
  email: string;
  name: string;
  phone?: string;
  address?: string;
};

const UserInfModal = ({ data, onClose }: UserInfModalProps) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { email, name, address, phone } = data;
  const [inputUser, setInputUser] = useState<InputUser>({
    email,
    name,
    address,
    phone,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputUser({ ...inputUser, [name]: value });
  };

  const validate = useMemo(() => {
    const { email, name, phone, address } = inputUser;
    return !!(email.length, name.length, phone?.length !== 10, address?.length);
  }, [inputUser]);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate) return;

    try {
      const res = await axiosPrivate.patch('user/updateMe', inputUser);

      console.log(res);
      if (res.status === 200) {
        toast.success('Success!!');
        dispatch(setUser(res.data.data.user));
        onClose();
      }
    } catch (error) {}
  };

  return (
    <Modal className="user-inf-modal" onClose={onClose}>
      <h4>Enter your information</h4>

      <form onSubmit={formSubmitHandler}>
        <div className="user-inf-modal__inputs">
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
        <div className="user-inf-modal__cta">
          <Button
            type="button"
            className="btn--round btn--outline btn--shadow"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="btn--round btn--outline btn--shadow btn--blue"
            disabled={!validate}
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default UserInfModal;
