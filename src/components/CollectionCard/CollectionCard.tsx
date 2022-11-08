import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { createSearchParams, useNavigate } from 'react-router-dom';

import imageCategory from '../../utils/imageCategory';
import Button from '../UI/Button/Button';
import './CollectionCard.scss';

interface ICollectionCard {
  id: string;
  name: string;
  imageUrl: string;
}

const CollectionCard = ({ id, name, imageUrl }: ICollectionCard) => {
  const navigate = useNavigate();

  const clickCategoryCardHandler = (id: string) => {
    navigate({
      pathname: '/products',
      search: createSearchParams({
        category: id,
      }).toString(),
    });
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
      <Button
        className="collection-card__rectangle"
        onClick={() => clickCategoryCardHandler(id)}
      >
        {name}
      </Button>
    </article>
  );
};
export default React.memo(CollectionCard);
