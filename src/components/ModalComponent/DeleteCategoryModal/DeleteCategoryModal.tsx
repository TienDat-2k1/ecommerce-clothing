import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { CategoryModel } from '../../../Model/categoryModel';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import './DeleteCategoryModal.scss';

type DeleteCategoryModalProps = {
  category: CategoryModel;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteCategoryModal = ({
  category,
  onClose,
  onDelete,
}: DeleteCategoryModalProps) => {
  const axiosPrivate = useAxiosPrivate();
  const deleteCategoryHandler = async () => {
    try {
      const res = await axiosPrivate.delete(`categories/${category._id}`);

      if (res.status === 204) {
        toast.success('Success ✔');
        onClose();
        onDelete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose} className="delete-category-modal">
      <div>
        <span> Do you want to delete </span>
        <h4>{category.name}</h4>
      </div>
      <div>
        <Button className="btn--outline btn--round" onClick={onClose}>
          Cancel
        </Button>
        <Button className="btn--red btn--round" onClick={deleteCategoryHandler}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};
export default DeleteCategoryModal;
