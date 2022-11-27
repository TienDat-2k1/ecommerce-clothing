// import { useEffect, useState } from 'react';
import { useGetAllCategoryQuery } from '../../../features/category/categoryApiSlice';

// import * as categoryServices from '../../../services/categoryServices';
import { CategoryModel } from '../../../utils/types';
import CollectionCard from '../../CollectionCard/CollectionCard';
import Spinner from '../../UI/Spinner/Spinner';
import './HomeCollection.scss';

const HomeCollection = () => {
  // const [collections, setCollection] = useState<Collection[]>([]);
  const { data, isFetching, isLoading } = useGetAllCategoryQuery();

  // useEffect(() => {
  //   const fetchCollection = async () => {
  //     const result = await categoryServices.getAllCategories();

  //     setCollection(result);
  //   };
  //   fetchCollection();
  // }, []);

  return (
    <>
      {(isFetching || isLoading) && <Spinner />}
      {data && (
        <section className="collection container">
          <div className="collection__heading">
            <h1 className="collection__title">new collection</h1>
            <span className="collection__description">2022 Collection</span>
          </div>
          <div className="collection__top">
            <div className="dot-texture"></div>
            <div className="dot-texture"></div>

            <div className="row" style={{ width: '100%' }}>
              {(data.results as CategoryModel[])
                .filter((_, i) => i < 4)
                .map(collection => {
                  return (
                    <div key={collection._id} className="col c-3 md-6">
                      <CollectionCard
                        name={collection.name}
                        imageUrl={collection.imageCover}
                        id={collection._id}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default HomeCollection;
