import { useState, useEffect } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UserInfModal from '../../components/ModalComponent/UserInfModal/UserInfModal';
import Button from '../../components/UI/Button/Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { userSelector } from '../../store/user/userSelector';
import { setUser } from '../../store/user/userSlice';

import imageUser from '../../utils/imageUser';
import './UserInf.scss';

const UserInf = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector(userSelector);
  const [avatarPreview, setAvatarPreview] = useState<any>();

  useEffect(() => {
    return () => {
      avatarPreview && URL.revokeObjectURL(avatarPreview.url);
    };
  }, [avatarPreview]);

  const avatarPreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setAvatarPreview({ file, url: URL.createObjectURL(file) });
    }
  };

  const showEditor = () => {
    setIsEdit(true);
  };

  const hideEditor = () => {
    setIsEdit(false);
  };

  const onSave = async () => {
    const formData = new FormData();
    formData.append('photo', avatarPreview.file, avatarPreview.file.name);

    try {
      const res = await axiosPrivate.patch('user/updateMe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);

      if (res.status === 200) {
        toast.success('Success!!');
        setAvatarPreview(undefined);

        dispatch(setUser(res.data.data.user));
      }
    } catch (error) {}
  };

  return (
    <>
      {user && (
        <div className="user-inf__container">
          <Button
            className="btn--round  btn--shadow btn--blue user-inf__edit"
            onClick={showEditor}
          >
            Chỉnh sửa
          </Button>
          <div className="user-inf__avatar">
            <div className="user-inf__img">
              {avatarPreview ? (
                <img src={avatarPreview.url} alt="" />
              ) : (
                <img src={imageUser(user.photo)} alt="" />
              )}
              <div className="user-inf__change-avt">
                <input
                  type="file"
                  id="avt-change"
                  onChange={avatarPreviewChange}
                  accept="image/png, image/gif, image/jpeg"
                />
                <label htmlFor="avt-change">
                  <BsFillPencilFill />
                </label>
              </div>
            </div>
          </div>
          <div className="user-inf__info">
            <div className="user-inf__content">
              <span>Tài khoản:</span>
              <h3>{user.email}</h3>
            </div>
            <div className="user-inf__content">
              <span>Tên hiển thị:</span>
              <h3>{user.name}</h3>
            </div>
            <div className="user-inf__content">
              <span>Số điện thoại:</span>
              <h3>{user.phone}</h3>
            </div>
            <div className="user-inf__content">
              <span>Địa chỉ:</span>
              <h3>{user.address}</h3>
            </div>
          </div>
          {avatarPreview && (
            <div className="user-inf__cta">
              <Button
                className="btn--round btn--outline user-inf__btn"
                onClick={() => setAvatarPreview(undefined)}
              >
                Hủy
              </Button>
              <Button
                className="btn--round btn--blue user-inf__btn"
                onClick={onSave}
              >
                Lưu
              </Button>
            </div>
          )}
        </div>
      )}

      {isEdit && <UserInfModal onClose={hideEditor} data={user} />}
    </>
  );
};
export default UserInf;
