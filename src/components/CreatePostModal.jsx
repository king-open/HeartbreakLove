import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !imageUrl.trim()) return;

    setIsSubmitting(true);
    
    const newPost = {
      id: Date.now(),
      content,
      image: imageUrl,
      likes: 0,
      comments: [],
      liked: false,
      timestamp: new Date().toISOString(),
    };

    try {
      await onSubmit(newPost);
      setContent('');
      setImageUrl('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            发布新帖子
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              图片链接
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="请输入图片链接"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                         dark:border-gray-600 dark:bg-gray-700 
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-primary-500 
                         bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <PhotoIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享你的想法..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 dark:bg-gray-700 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={imageUrl}
                alt="预览"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=图片加载失败';
                }}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 
                       dark:hover:text-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              取消
            </button>
            <motion.button
              type="submit"
              disabled={isSubmitting || !content.trim() || !imageUrl.trim()}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 
                       text-white rounded-lg disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? '发布中...' : '发布'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

CreatePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}; 
