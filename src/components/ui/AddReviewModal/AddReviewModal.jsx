import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { X, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const AddReviewModal = ({ isOpen, onClose, onSubmit, productName }) => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    comment: '',
    name: '',
  });

  const handleSubmit = () => {
    if (!rating) {
      toast.error('Please select a rating!');
      return;
    }
    if (!formData.name || !formData.comment) {
      toast.error('Please fill all required fields!');
      return;
    }

    // TODO: POST /api/products/:id/reviews with the review payload.
    onSubmit({
      id: Date.now(),
      name: formData.name,
      avatar: `https://picsum.photos/seed/${Date.now()}/40/40`,
      rating,
      date: new Date().toISOString().split('T')[0],
      title: formData.title,
      comment: formData.comment,
      helpful: 0,
      verified: false,
    });
    toast.success('Review submitted! Thank you 🎉');
    onClose();
    setRating(0);
    setFormData({ title: '', comment: '', name: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed inset-x-4 top-1/2 -translate-y-1/2
              md:inset-auto md:left-1/2 md:-translate-x-1/2
              md:w-[500px] z-50 ${theme.bgCard}
              rounded-2xl p-6 shadow-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`font-bold text-lg ${theme.text}`}>
                  Write a Review
                </h2>
                <p className={`text-sm ${theme.textSecondary}`}>
                  {productName}
                </p>
              </div>
              <button onClick={onClose}
                className={`p-2 rounded-full ${theme.bgSecondary}`}>
                <X size={20} className={theme.text} />
              </button>
            </div>

            <div className="mb-5">
              <label className={`text-sm font-medium
                mb-2 block ${theme.text}`}>
                Your Rating *
              </label>
              <div className="flex gap-2">
                {Array(5).fill(0).map((_, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHoveredRating(i + 1)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(i + 1)}
                    className="transition-transform
                      hover:scale-125">
                    <Star
                      size={32}
                      fill={i < (hoveredRating || rating)
                        ? '#FBBF24' : 'none'}
                      className={i < (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm font-medium
                    text-yellow-500 self-center">
                    {['', 'Poor', 'Fair', 'Good',
                      'Very Good', 'Excellent'][rating]}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className={`text-sm font-medium
                mb-1.5 block ${theme.text}`}>
                Your Name *
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({
                  ...formData, name: e.target.value
                })}
                className={`w-full px-4 py-3 rounded-xl
                  border outline-none text-sm
                  ${theme.input} ${theme.text} ${theme.border}
                  focus:border-blue-500 transition-colors
                  placeholder-gray-400`}
              />
            </div>

            <div className="mb-4">
              <label className={`text-sm font-medium
                mb-1.5 block ${theme.text}`}>
                Review Title
              </label>
              <input
                type="text"
                placeholder="Sum up your experience"
                value={formData.title}
                onChange={(e) => setFormData({
                  ...formData, title: e.target.value
                })}
                className={`w-full px-4 py-3 rounded-xl
                  border outline-none text-sm
                  ${theme.input} ${theme.text} ${theme.border}
                  focus:border-blue-500 transition-colors
                  placeholder-gray-400`}
              />
            </div>

            <div className="mb-6">
              <label className={`text-sm font-medium
                mb-1.5 block ${theme.text}`}>
                Your Review *
              </label>
              <textarea
                rows={4}
                placeholder="Share your experience with this product..."
                value={formData.comment}
                onChange={(e) => setFormData({
                  ...formData, comment: e.target.value
                })}
                className={`w-full px-4 py-3 rounded-xl
                  border outline-none text-sm resize-none
                  ${theme.input} ${theme.text} ${theme.border}
                  focus:border-blue-500 transition-colors
                  placeholder-gray-400`}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={onClose}
                className={`flex-1 py-3 rounded-xl border
                  font-medium text-sm ${theme.text}
                  ${theme.border} hover:bg-gray-100/10
                  transition-colors`}>
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl bg-blue-500
                  hover:bg-blue-600 text-white font-medium
                  text-sm transition-colors">
                Submit Review
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddReviewModal;
