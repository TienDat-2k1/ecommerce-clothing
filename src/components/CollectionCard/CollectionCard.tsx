import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCategory } from '../../store/search/searchSlice';

import imageCategory from '../../utils/imageCategory';
import Button from '../UI/Button/Button';
import './CollectionCard.scss';

interface ICollectionCard {
  id: string;
  name: string;
  imageUrl: string;
}

const CollectionCard = ({ id, name, imageUrl }: ICollectionCard) => {
  const dispatch = useDispatch();

  const clickCategoryCardHandler = (id: string) => {
    dispatch(setCategory(id));
  };

  return (
    <article className="collection-card">
      <LazyLoadImage
        src={imageCategory(imageUrl)}
        alt={name}
        effect="blur"
        wrapperClassName="collection-card__background"
        className="collection-card__image"
      />
      {/* <div className="collection-card__background">
        <img
          className="collection-card__image"
          src={imageCategory(imageUrl)}
          alt={name}
        />
      </div> */}
      <Button
        as={Link}
        to="products"
        className="collection-card__rectangle"
        onClick={() => clickCategoryCardHandler(id)}
      >
        {name}
      </Button>
    </article>
  );
};
export default React.memo(CollectionCard);
