import imageProduct from '../../utils/imageProduct';
import './HeaderSearchItem.scss';

type HeaderSearchItemProps = {
  id: string;
  name: string;
  price: number;
  imageCover: string;
  onClick: () => void;
};

const HeaderSearchItem = ({
  id,
  name,
  price,
  imageCover,
  onClick,
}: HeaderSearchItemProps) => {
  return (
    <div className="header-search__item" onClick={onClick}>
      <div>
        <h4>{name}</h4>
        <span>{price}$</span>
      </div>
      <div>
        <img src={imageProduct(imageCover)} alt="" />
      </div>
    </div>
  );
};
export default HeaderSearchItem;
