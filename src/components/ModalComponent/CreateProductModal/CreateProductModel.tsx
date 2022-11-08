import Multiselect from 'multiselect-react-dropdown';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { RiImageAddLine } from 'react-icons/ri';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import * as categoryService from '../../../services/categoryServices';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../UI/Modal/Modal';
import './CreateProductModal.scss';
import Button from '../../UI/Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { CategoryModel } from '../../../utils/types';

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
  sizes: string[];
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
    sizes: [],
  });

  const [imageCoverPreview, setImageCoverPreview] = useState<any>();
  const [imagesPreview, setImagesPreview] = useState<any>();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryService.getAllCategories();

      setCategories(res);
    };
    fetchCategories();
  }, []);

  // clear memory imageCover preview
  useEffect(() => {
    return () =>
      imageCoverPreview && URL.revokeObjectURL(imageCoverPreview.url);
  }, [imageCoverPreview]);

  // clear memory images preview
  useEffect(() => {
    return () =>
      imagesPreview &&
      imagesPreview.forEach((image: any) => {
        URL.revokeObjectURL(image.url);
      });
  }, [imagesPreview]);

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files)
        setImageCoverPreview({
          file: e.target.files[0],
          url: URL.createObjectURL(e.target.files[0]),
        });
    },
    []
  );

  const imagesHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const filesPreview = Array.from(e.target.files).map(file => ({
          file,
          url: URL.createObjectURL(file),
        }));
        setImagesPreview(filesPreview);
      }
    },
    []
  );

  const removeImagesHandler = (url: string) => {
    const newImages = imagesPreview.filter((image: any) => image.url !== url);
    setImagesPreview(newImages);
  };

  const validate = useMemo(() => {
    return !(
      productInput.name.length &&
      productInput.material.length &&
      imageCoverPreview &&
      productInput.sizes.length &&
      productInput.category.length
    );
  }, [productInput, imageCoverPreview]);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate) return;

    try {
      const formData = new FormData();

      productInput.name.trim() && formData.append('name', productInput.name);
      productInput.material.trim() &&
        formData.append('material', productInput.material);
      formData.append('price', productInput.price);
      formData.append('saleOff', productInput.saleOff);
      productInput.category.trim() &&
        formData.append('category', productInput.category);
      productInput.description.trim() &&
        formData.append('description', productInput.description);

      productInput.sizes.length &&
        productInput.sizes.forEach(size => {
          formData.append('sizes', size);
        });

      imageCoverPreview &&
        formData.append(
          'imageCover',
          imageCoverPreview.file,
          imageCoverPreview.file.name
        );

      imagesPreview &&
        imagesPreview.forEach((image: any) => {
          formData.append('images', image.file, image.file.name);
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
          <div className="create-product__category  col c-3">
            <span>Category</span>
            <select
              name="category"
              autoComplete="on"
              onChange={textChangeHandler}
            >
              <option defaultValue="">Select a category</option>
              {categories.length &&
                categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="create-product__sizes col c-9">
            <span>Sizes</span>
            <Multiselect
              className="create-product__sizes-select"
              options={['S', 'M', 'L', 'XL', 'XXL', 'XXL']}
              isObject={false}
              style={{
                chips: {
                  background: 'black',
                  width: '60px',
                  display: 'flex',
                  justifyContent: 'space-between',
                },
                multiselectContainer: {
                  color: 'black',
                },
                searchBox: {
                  width: '100%',
                },
              }}
              onSelect={list =>
                setProductInput({ ...productInput, sizes: list })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="create-product__description col c-12">
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
            {imageCoverPreview && <img src={imageCoverPreview.url} alt="" />}
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
              imagesPreview.map((image: any) => (
                <div key={image.url}>
                  <img src={image.url} alt="" />
                  <div onClick={() => removeImagesHandler(image.url)}>
                    <AiOutlineCloseCircle />
                  </div>
                </div>
              ))}
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
          <Button
            className="btn--round btn--outline btn--violet btn--shadow"
            disabled={validate}
          >
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
