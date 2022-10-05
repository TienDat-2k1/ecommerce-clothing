import { useState, useEffect, useCallback } from 'react';

import * as categoryService from '../../../services/categoryServices';
import { CategoryModel } from '../../../Model/categoryModel';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../Modal/Modal';
import './CreateProductModal.scss';
import { RiImageAddLine } from 'react-icons/ri';
import Button from '../../UI/Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type CreateProductModalProps = {
  onClose: () => void;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProductInput = {
  name: string;
  material: string;
  price: string;
  saleOff: string;
  category: string;
  description: string;
  imageCover?: any;
  images?: any;
};

const CreateProductModel = ({
  onClose,
  setIsCreate,
}: CreateProductModalProps) => {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [productInput, setProductInput] = useState<ProductInput>({
    name: '',
    material: '',
    price: '0',
    saleOff: '0',
    category: '',
    description: '',
  });

  const [imageCoverPreview, setImageCoverPreview] = useState<any>();
  const [imagesPreview, setImagesPreview] = useState<any>();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryService.getAllCategories();

      setCategories(res.categories);
    };
    fetchCategories();
  }, []);

  // clear memory imageCover
  useEffect(() => {
    return () => imageCoverPreview && URL.revokeObjectURL(imageCoverPreview);
  }, [imageCoverPreview]);

  const textChangeHandler = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setProductInput({ ...productInput, [name]: value });
    },
    [productInput]
  );

  const imageCoverHandler = useCallback(
    (e: any) => {
      setImageCoverPreview(URL.createObjectURL(e.target.files[0]));
      setProductInput({ ...productInput, imageCover: e.target.files[0] });
    },
    [productInput]
  );

  const imagesHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.dir(e.target.files);
      let filesPreview: string[] = [];
      if (e.target.files) {
        filesPreview = Array.from(e.target.files).map(file =>
          URL.createObjectURL(file)
        );
      }
      console.log(filesPreview);
      setImagesPreview(filesPreview);
      setProductInput({ ...productInput, images: e.target.files });
    },
    [productInput]
  );

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(productInput);

    try {
      const formData = new FormData();

      formData.append('name', productInput.name);
      formData.append('material', productInput.material);
      formData.append('price', productInput.price);
      formData.append('saleOff', productInput.saleOff);
      formData.append('category', productInput.category);
      formData.append('description', productInput.description);
      formData.append(
        'imageCover',
        productInput.imageCover,
        productInput.imageCover?.name as string
      );

      productInput.images &&
        Array.from(productInput.images).forEach((image: any) => {
          formData.append('images', image, image.name);
        });

      console.log(formData.getAll('images'));

      const res = await axiosPrivate.post('products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 201) {
        setIsCreate(true);
        onClose();
        toast.success('Create Successful!!');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please check fields again!!');
      }
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose} className="create-product-modal">
      <form action="" onSubmit={formSubmitHandler}>
        <div className="row">
          <div className="col c-3">
            <FormInput
              label="Name"
              value={productInput.name}
              name="name"
              onChange={textChangeHandler}
            />
          </div>
          <div className="col c-3">
            <FormInput
              label="Material"
              value={productInput.material}
              name="material"
              onChange={textChangeHandler}
            />
          </div>
          <div className="col c-3">
            <FormInput
              label="Price"
              type="number"
              min={0}
              value={productInput.price}
              name="price"
              onChange={textChangeHandler}
            />
          </div>
          <div className="col c-3">
            <FormInput
              label="Sale Off"
              type="number"
              min={0}
              max={100}
              value={productInput.saleOff}
              name="saleOff"
              onChange={textChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="create-product__category col c-3">
            <span>Category</span>
            <select
              name="category"
              autoComplete="on"
              onChange={textChangeHandler}
            >
              <option value="" selected>
                Select a category
              </option>
              {categories.length &&
                categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="create-product__description col c-9">
            <span>Description</span>
            <textarea
              className=""
              name="description"
              id=""
              value={productInput.description}
              onChange={textChangeHandler}
            ></textarea>
          </div>
        </div>

        <div className="row create-product__image">
          <div>
            <h4>Image Cover:</h4>
            <input
              type="file"
              accept="image/*"
              id="image-cover"
              onChange={imageCoverHandler}
            />
            <div className="create-product__image-label">
              <label htmlFor="image-cover">
                Choose your product photo
                <RiImageAddLine />
              </label>
            </div>
          </div>
          <div className="imageCover-preview">
            {imageCoverPreview && <img src={imageCoverPreview} alt="" />}
          </div>
        </div>

        <div className="row create-product__image">
          <div>
            <h4>Images:</h4>
            <input
              type="file"
              accept="image/*"
              id="images"
              multiple
              onChange={imagesHandler}
            />
            <div className="create-product__image-label">
              <label htmlFor="images">
                Provide more product photos (Can choose multiple)
                <RiImageAddLine />
              </label>
            </div>
          </div>
          <div className="images-preview">
            {imagesPreview &&
              imagesPreview.map((image: any) => <img src={image} alt="" />)}
          </div>
        </div>

        <div className="create-product__cta">
          <Button
            type="button"
            className="btn--round btn--outline btn--shadow"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="btn--round btn--outline btn--violet btn--shadow">
            Create
          </Button>
        </div>
      </form>
      <div className="create-product__close-modal" onClick={onClose}>
        <AiOutlineCloseCircle />
      </div>
    </Modal>
  );
};
export default CreateProductModel;
