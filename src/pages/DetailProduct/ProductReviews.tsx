import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Rating from '../../components/UI/Rating/Rating';
import Button from '../../components/UI/Button/Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getAllReviewProduct } from '../../services/productServices';
import imageUser from '../../utils/imageUser';
import './ProductReview.scss';
import { useSelector } from 'react-redux';
import { isLoggedSelector } from '../../store/user/userSelector';
import { ReviewModel } from '../../utils/types';

const ProductReviews = () => {
  const { productId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const isLogged = useSelector(isLoggedSelector);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isSubmitReview, setIsSubmitReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    review: '',
  });

  useEffect(() => {
    const fetchProductReview = async (id: string) => {
      const res = await getAllReviewProduct(id);
      setReviews(res.data);
      setIsSubmitReview(false);
    };

    fetchProductReview(productId ? productId : '');
  }, [productId, isSubmitReview]);

  const ratingChangeHandler = (number: number) => {
    setReviewForm({ ...reviewForm, rating: number });
  };

  const reviewTextChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReviewForm({ ...reviewForm, review: e.target.value });
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogged) {
      toast.warning('Please loggin for this action');
      return;
    }

    try {
      const res = await axiosPrivate.post(`products/${productId}/reviews`, {
        ...reviewForm,
      });

      if (res.status === 201) {
        setIsSubmitReview(true);
        toast.success('Commented');
        setReviewForm({ rating: 0, review: '' });
      }
    } catch (error) {
      toast.error('Some thing went wrong, please try again!!');
    }
  };

  return (
    <div className="reviews">
      <form className="reviews__form" onSubmit={formSubmitHandler}>
        <div className="reviews__rate">
          <Rating
            count={5}
            onRating={ratingChangeHandler}
            rating={reviewForm.rating}
            color={{ filled: '#FFBF00', unfilled: '#ccc' }}
          />
        </div>
        {!!reviewForm.rating && (
          <>
            <textarea
              value={reviewForm.review}
              required
              maxLength={200}
              onChange={reviewTextChangeHandler}
            ></textarea>
            <div className="reviews__form-cta">
              <Button
                type="button"
                className="btn--round btn--outline btn--shadow"
                onClick={() => setReviewForm({ rating: 0, review: '' })}
              >
                Cancel
              </Button>
              <Button
                className="btn--round btn--blue btn--shadow"
                disabled={!reviewForm.review.length}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </form>

      <div className="reviews__list">
        {reviews.map(review => {
          const dateTime = new Intl.DateTimeFormat('vn-VN', {
            dateStyle: 'short',
            timeStyle: 'short',
          })
            .format(new Date(review.createAt))
            .split(', ')
            .join(' ');

          return (
            <div key={review.id} className="reviews__item">
              <div className="reviews__user">
                <img src={imageUser(review.user.photo)} alt="" />
              </div>
              <div className="reviews__contents">
                <h4>{review.user.name}</h4>
                <Rating
                  count={5}
                  rating={review.rating}
                  color={{ filled: '#FFBF00', unfilled: '#ccc' }}
                />
                <span>{dateTime}</span>
                <p>{review.review}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductReviews;
