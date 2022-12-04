import { useState, useEffect, useMemo } from 'react';

import { RiImageAddLine } from 'react-icons/ri';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import './CreateCategoryModal.scss';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

type CreateCategoryModalProps = {
  onCreate: () => void;
  onClose: () => void;
};

const CreateCategoryModal = ({
  onClose,
  onCreate,
}: CreateCategoryModalProps) => {
  const axiosPrivate = useAxiosPrivate();
  const [categoryName, setCategoryName] = useState('');
  const [imageCover, setImageCover] = useState<any>();

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  useEffect(() => {
    return () => {
      imageCover && URL.revokeObjectURL(imageCover.url);
    };
  }, [imageCover]);

  const imageCoverChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: any = e.target.files[0];
      const url = URL.createObjectURL(file);

      setImageCover({ file, url });
    }
  };

  const removeImagePreview = () => {
    setImageCover(null);
  };

  const validate = useMemo(() => {
    return !(categoryName && imageCover);
  }, [categoryName, imageCover]);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate) return;

    const formData = new FormData();

    categoryName && formData.append('name', categoryName);

    imageCover &&
      formData.append('imageCover', imageCover.file, imageCover.file.name);

    console.log(formData.getAll('imageCover'));

    try {
      const res = await axiosPrivate.post('categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201) {
        toast.success('Create Successful ✔');
        onClose();
        onCreate();
      }

      console.log(res);
    } catch (error) {
      toast.warn('Please check fields again!!');
      console.log(error);
    }
  };

  return (
    <Modal className="create-category-modal" onClose={onClose}>
      <form action="" onSubmit={formSubmitHandler}>
        <div className="row">
          <div className='col c-12"'>
            <FormInput
              label="Tên danh mục"
              value={categoryName}
              onChange={nameChangeHandler}
            />
          </div>
        </div>
        <div className="create-category__upload row">
          <div>
            <h4>Hình ảnh:</h4>
            <input
              type="file"
              accept="image/*"
              id="images"
              onChange={imageCoverChangeHandler}
            />
            <div className="create-category__image-label">
              <label htmlFor="images">
                Cung cấp hình ảnh đại diện
                <RiImageAddLine />
              </label>
            </div>
          </div>
          <div className="create-category__image-preview">
            {imageCover && (
              <div key={imageCover.url}>
                <img src={imageCover.url} alt="" />
                <div onClick={removeImagePreview}>
                  <AiOutlineCloseCircle />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row create-category__cta">
          <Button
            type="button"
            className="btn--round btn--outline btn--shadow"
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            className="btn--round btn--shadow btn--blue"
            disabled={validate}
          >
            Tạo
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default CreateCategoryModal;
