import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function ImagePreviewModal({ isOpen, onClose, imageUrl }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  // 预加载图片
  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setIsImageLoading(false);
    }
    return () => setIsImageLoading(true);
  }, [imageUrl]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full 
                   bg-white/10 backdrop-blur-sm
                   text-white/90 hover:text-white 
                   transition-all duration-300"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>
        
        <motion.div
          className="relative max-w-4xl w-full aspect-auto rounded-lg overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          {/* 加载动画 */}
          {isImageLoading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-gray-900/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </motion.div>
          )}

          <motion.img
            src={imageUrl}
            alt="预览图片"
            className="w-full h-full object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
            layoutId="preview-image"
            transition={{ duration: 0.3 }}
            drag
            dragConstraints={{
              top: -100,
              left: -100,
              right: 100,
              bottom: 100
            }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.1 }}
            whileHover={{ scale: 1.02 }}
            onLoad={() => setIsImageLoading(false)}
            style={{ 
              opacity: isImageLoading ? 0 : 1,
              transition: 'opacity 0.3s'
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

ImagePreviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
}; 
