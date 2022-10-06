import Multiselect from 'multiselect-react-dropdown';
import React, { useState, useCallback, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiImageAddLine } from 'react-icons/ri';

import * as categoryService from '../../../services/categoryServices';
import * as productServices from '../../../services/productServices';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { CategoryModel } from '../../../Model/categoryModel';
import { ProductModel } from '../../../Model/productModel';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../Modal/Modal';
import Button from '../../UI/Button/Button';
import './UpdateProductModal.scss';
import imageProduct from '../../../utils/imageProduct';
import { toast } from 'react-toastify';
import Spinner from '../../Spinner/Spinner';

type UpdateProductModalProps = {
  onClose: () => void;
  onUpdate: () => void;
  id: string;
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

const UpdateProductModal = ({
  onClose,
  id,
  onUpdate,
}: UpdateProductModalProps) => {
  const [product, setProduct] = useState<ProductModel>();

  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [imageCoverPreview, setImageCoverPreview] = useState<any>();
  const [images, setImages] = useState<any>();
  const [productInput, setProductInput] = useState<ProductInput>(
    {} as ProductInput
  );

  // fetch Category
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryService.getAllCategories();
      setCategories(res);
    };

    fetchCategories();
  }, []);

  // fetch product
  useEffect(() => {
    const fetchProducts = async (id: string) => {
      const res = await productServices.getProduct(id);
      const p = res.data;

      setProductInput({
        name: p.name,
        material: p.material,
        price: '' + p.price,
        saleOff: '' + p.saleOff,
        category: p.category,
        description: p.description,
        imageCover: p.imageCover,
        images: p.images,
        sizes: p.sizes,
      });
      setProduct(p);
    };

    fetchProducts(id);
  }, [id]);

  // clear memory imageCover preview
  useEffect(() => {
    return () =>
      imageCoverPreview && URL.revokeObjectURL(imageCoverPreview.url);
  }, [imageCoverPreview]);

  // clear memory images preview
  useEffect(() => {
    return () =>
      images &&
      images.forEach((image: any) => {
        URL.revokeObjectURL(image.url);
      });
  }, [images]);

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
      setImageCoverPreview({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
      // setImageCoverPreview(URL.createObjectURL(e.target.files[0]));
      setProductInput({ ...productInput, imageCover: e.target.files[0] });
    },
    [productInput]
  );

  const imagesHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let images: any = [];
      e.target.files &&
        Array.from(e.target.files).forEach(file => {
          images.push({ file, url: URL.createObjectURL(file) });
        });

      setImages(images);
    },
    []
  );

  const imagesProductRemove = (image: string) => {
    const newImageProductValue = productInput.images.filter(
      (img: string) => img !== image
    );

    setProductInput({ ...productInput, images: newImageProductValue });
  };

  const imagesPreviewRemove = (url: string) => {
    const imgs = images.filter((img: any) => img.url !== url);

    setImages(imgs);
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
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

      productInput.images &&
        productInput.images.forEach((image: any) => {
          formData.append('images', image);
        });

      images &&
        images.forEach((image: any) => {
          formData.append('images', image.file, image.file.name);
        });

      console.log(formData.getAll('sizes'));

      const res = await axiosPrivate.patch(
        `products/${product._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.status === 200) {
        toast.success('Update product successful!!');
        onUpdate();
        onClose();
      }
    } catch (error) {
      toast.warning('Something went wrong !!!');
      console.log(error);
    }
  };

  return (
    <Modal className="create-product-modal" onClose={onClose}>
      {!product && <Spinner />}
      {product && (
        <>
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
                <Multiselect
                  options={categories}
                  selectedValues={categories.filter(category => {
                    return category._id === product.category;
                  })}
                  displayValue="name"
                  singleSelect
                  style={{
                    chips: {
                      background: 'white',
                    },
                    // multiselectContainer: {
                    //   color: 'black',
                    // },
                    searchBox: {
                      width: '100%',
                      borderRadius: '999px',
                      fontSize: '10px',
                    },
                    inputField: {
                      fontSize: '14px',
                    },
                  }}
                  onSelect={(_, item) =>
                    setProductInput({ ...productInput, category: item._id })
                  }
                  customCloseIcon={<></>}
                />
              </div>
              <div className="create-product__sizes col c-9">
                <span>Sizes</span>
                <Multiselect
                  className="create-product__sizes-select"
                  options={['S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                  selectedValues={product.sizes}
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
                  onSelect={list => {
                    return setProductInput({ ...productInput, sizes: list });
                  }}
                  onRemove={list => {
                    return setProductInput({ ...productInput, sizes: list });
                  }}
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
                {imageCoverPreview ? (
                  <img src={imageCoverPreview.url} alt="" />
                ) : (
                  <img src={imageProduct(product.imageCover)} alt="" />
                )}
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
                {productInput.images &&
                  productInput.images.map((image: string, index: number) => (
                    <div key={index}>
                      <img src={imageProduct(image)} alt="" />
                      <div onClick={() => imagesProductRemove(image)}>
                        <AiOutlineCloseCircle />
                      </div>
                    </div>
                  ))}

                {images &&
                  images.map((image: any, i: number) => (
                    <div key={i}>
                      <img src={image.url} alt="" />
                      <div onClick={() => imagesPreviewRemove(image.url)}>
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
              <Button className="btn--round btn--outline btn--violet btn--shadow">
                Update
              </Button>
            </div>
          </form>
          <div className="create-product__close-modal" onClick={onClose}>
            <AiOutlineCloseCircle />
          </div>
        </>
      )}
    </Modal>
  );
};
export default UpdateProductModal;
