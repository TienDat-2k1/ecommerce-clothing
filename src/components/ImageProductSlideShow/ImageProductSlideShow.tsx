import { useState, useEffect, useRef } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import imageProduct from '../../utils/imageProduct';

import './ImageProductSlideShow.scss';

type ImageSlideShowProps = {
  className?: string;
  images: string[];
};

const ImageProductSlideShow = ({ className, images }: ImageSlideShowProps) => {
  const slideRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [slideIndex, setSlideIndex] = useState(1);
  const [width, setWidth] = useState(0);
  const [start, setStart] = useState(0);
  const [change, setChange] = useState(0);

  useEffect(() => {
    if (!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth;
    const childrenElementCount = slideRef.current.childElementCount;
    const width = scrollWidth / childrenElementCount;
    setWidth(width);
  }, []);

  useEffect(() => {
    if (!slideRef.current || !width) return;
    const numOfThumb = Math.round(slideRef.current.offsetWidth / width);
    slideRef.current.scrollLeft =
      slideIndex > numOfThumb ? (slideIndex - 1) * width : 0;
  }, [width, slideIndex]);

  const increaseSlideIndex = () => {
    setSlideIndex(prev => (prev === images.length ? 1 : prev + 1));
  };
  const decreaseSlideIndex = () => {
    setSlideIndex(prev => (prev === 1 ? images.length : prev - 1));
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStart(e.clientX);
  };
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const touch = e.clientX;
    setChange(start - touch);
  };
  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // drag left change > 0
    // drag right change < 0

    if (change > 0) {
      slideRef.current.scrollLeft += width;
    } else {
      slideRef.current.scrollLeft -= width;
    }
  };

  return (
    <div className={`images-slide ${className}`}>
      <div className="images-slide__img-show">
        {images.map((image, index) => (
          <div
            key={index}
            className={`images-slide__slides ${
              index + 1 === slideIndex ? 'images-slide__slides--active' : ''
            }`}
          >
            <div>
              {index + 1} / {images.length}
            </div>
            <img src={imageProduct(image)} alt="" />
          </div>
        ))}
        <div
          className="images-slide__icon icon-left"
          onClick={decreaseSlideIndex}
        >
          <AiOutlineArrowLeft />
        </div>
        <div
          className="images-slide__icon icon-right"
          onClick={increaseSlideIndex}
        >
          <AiOutlineArrowRight />
        </div>
      </div>
      <div
        className="images-slide__slider-img"
        draggable={true}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        ref={slideRef}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`images-slide__slider-box ${
              index + 1 === slideIndex ? 'images-slide__slider-box--active' : ''
            }`}
            onClick={() => setSlideIndex(index + 1)}
          >
            <img src={imageProduct(image)} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImageProductSlideShow;
