import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';

const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  editable = false,
  onChange,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(value);

  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const handleClick = (rating) => {
    if (editable) {
      setCurrentRating(rating);
      onChange?.(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (editable) {
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  return (
    <div className={classNames('flex items-center', className)}>
      {[...Array(max)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = hoverRating ? ratingValue <= hoverRating : ratingValue <= currentRating;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
            disabled={!editable}
            className={classNames(
              'focus:outline-none',
              {
                'cursor-pointer': editable,
                'cursor-default': !editable
              }
            )}
          >
            <StarIcon
              className={classNames(
                sizes[size],
                isFilled ? 'text-yellow-400' : 'text-gray-300'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;