import axios from 'axios';
import { useEffect, useState } from 'react';
import CollectionCard from '../../CollectionCard/CollectionCard';
import './HomeCollection.scss';

type Collection = {
  imageCover: string;
  name: string;
  _id: string;
};

const HomeCollection = () => {
  const [collections, setCollection] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const res = await axios.get('http://localhost:5000/api/collections');

      setCollection(res.data.data.collections);
    };
    fetchCollection();
  }, []);

  return (
    <section className="collection container">
      <div className="collection__heading">
        <h1 className="collection__title">new collection</h1>
        <span className="collection__description">2022 Collection</span>
      </div>
      <div className="collection__top3">
        <div className="dot-texture"></div>
        <div className="dot-texture"></div>

        {collections &&
          collections.map(collection => {
            return (
              <CollectionCard
                key={collection._id}
                name={collection.name}
                imageUrl={collection.imageCover}
              />
            );
          })}
      </div>
    </section>
  );
};
export default HomeCollection;
