import { useMemo, useState, useCallback } from 'react';
import { AiFillStar } from 'react-icons/ai';

import './Rating.scss';

type RatingProps = {
  count: number;
  rating: number;
  color?: {
    filled: string;
    unfilled: string;
  };
  onRating?: (n: number) => void;
};

const Rating = ({ count, rating, color, onRating }: RatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = useCallback(
    (index: number) => {
      if (typeof onRating === 'function') {
        if (hoverRating >= index) return color?.filled;
        else if (!hoverRating && rating >= index) return color?.filled;
      } else if (rating >= index) return color?.filled;

      return color?.unfilled;
    },
    [hoverRating, rating, color, onRating]
  );

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map(i => {
        return (
          <AiFillStar
            key={i}
            className="rating__icon"
            onClick={() => onRating && onRating(i)}
            style={{ color: getColor(i) }}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
          />
        );
      });
  }, [count, onRating, getColor]);

  return <div className="rating">{starRating}</div>;
};
export default Rating;
