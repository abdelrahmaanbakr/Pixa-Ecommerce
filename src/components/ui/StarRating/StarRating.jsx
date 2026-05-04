import React from 'react';
import { Star } from 'lucide-react';

const StarIcon = ({ filled }) => (
  <Star
    size={14}
    fill={filled ? "#FFD700" : "none"}
    className={filled ? "text-yellow-400" : "text-gray-300"}
  />
);

const StarRating = ({ filled, rating }) => {
  if (typeof rating === 'number') {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <StarIcon key={index} filled={index < Math.round(rating)} />
        ))}
      </div>
    );
  }

  return (
    <StarIcon filled={filled} />
  );
};

export default StarRating;
