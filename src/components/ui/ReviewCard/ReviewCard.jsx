import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { Star, BadgeCheck, ThumbsUp, Flag } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const { theme } = useTheme();
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating
          ? 'text-yellow-400'
          : 'text-gray-300'}
        fill={i < rating ? '#FBBF24' : 'none'}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${theme.card} rounded-2xl p-5 shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => e.target.src =
              "https://picsum.photos/seed/default/40/40"}
          />
          <div>
            <div className="flex items-center gap-2">
              <p className={`font-semibold text-sm ${theme.text}`}>
                {review.name}
              </p>
              {review.verified && (
                <span className="flex items-center gap-1
                  text-xs text-green-500 bg-green-500/10
                  px-2 py-0.5 rounded-full">
                  <BadgeCheck size={12} />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex">
                {renderStars(review.rating)}
              </div>
              <span className={`text-xs ${theme.textSecondary}`}>
                {new Date(review.date)
                  .toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
              </span>
            </div>
          </div>
        </div>

        <span className={`text-xs font-bold px-2.5 py-1
          rounded-full ${
            review.rating >= 4
              ? 'bg-green-500/10 text-green-500'
              : review.rating === 3
              ? 'bg-yellow-500/10 text-yellow-500'
              : 'bg-red-500/10 text-red-500'
          }`}>
          {review.rating}.0 ⭐
        </span>
      </div>

      {review.title && (
        <h4 className={`font-semibold text-sm mb-2 ${theme.text}`}>
          "{review.title}"
        </h4>
      )}

      <p className={`text-sm leading-relaxed
        ${theme.textSecondary} mb-4`}>
        {review.comment}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs ${theme.textSecondary}`}>
            Helpful?
          </span>
          <button
            onClick={() => {
              if (!voted) {
                setHelpful(prev => prev + 1);
                setVoted(true);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5
              rounded-full text-xs font-medium transition-all
              border ${voted
                ? 'bg-blue-500 text-white border-blue-500'
                : `${theme.bgSecondary} ${theme.text}
                   ${theme.border} hover:border-blue-500
                   hover:text-blue-500`
              }`}>
            <ThumbsUp size={12} />
            {helpful}
          </button>
        </div>
        <button className={`text-xs ${theme.textSecondary}
          hover:text-red-500 transition-colors flex
          items-center gap-1`}>
          <Flag size={12} />
          Report
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
