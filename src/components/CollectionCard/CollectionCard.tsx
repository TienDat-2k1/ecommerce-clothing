import React from 'react';

import imageCategory from '../../utils/imageCategory';
import './CollectionCard.scss';

interface ICollectionCard {
  name: string;
  imageUrl: string;
}

const CollectionCard = ({ name, imageUrl }: ICollectionCard) => {
  return (
    <article className="collection-card">
      <div className="collection-card__background">
        <img
          className="collection-card__image"
          src={imageCategory(imageUrl)}
          alt={name}
        />
      </div>
      <button className="collection-card__rectangle ">{name}</button>
    </article>
  );
};
export default React.memo(CollectionCard);
