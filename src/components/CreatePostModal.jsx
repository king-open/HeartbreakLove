import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        alert('请选择图片文件');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !imageFile) return;

    setIsSubmitting(true);
    
    const newPost = {
      id: Date.now(),
      content,
      ...(imageFile && { image: previewUrl }),
      likes: 0,
      comments: [],
      liked: false,
      timestamp: new Date().toISOString(),
    };

    try {
      await onSubmit(newPost);
      setContent('');
      setImageFile(null);
      setPreviewUrl('');
      setShowImageUpload(false);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
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

          {!showImageUpload && !previewUrl && (
            <button
              type="button"
              onClick={() => setShowImageUpload(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-500 
                       hover:text-primary-500 transition-colors"
            >
              <PhotoIcon className="w-5 h-5" />
              <span>添加图片</span>
            </button>
          )}

          {(showImageUpload || previewUrl) && (
            <div
              className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 
                       rounded-lg p-4 hover:border-primary-500 dark:hover:border-primary-500 
                       transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              
              {!previewUrl ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <PhotoIcon className="w-12 h-12 mb-2" />
                  <p className="text-sm">点击或拖拽图片到这里</p>
                  <p className="text-xs mt-1">支持 JPG、PNG 格式</p>
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="预览"
                    className="w-full rounded-lg"
                  />
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 
                             group-hover:opacity-100 transition-opacity rounded-lg
                             flex items-center justify-center"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setPreviewUrl('');
                        setShowImageUpload(false);
                      }}
                      className="text-white px-4 py-2 rounded-lg bg-red-500 
                               hover:bg-red-600 transition-colors"
                    >
                      移除图片
                    </button>
                  </div>
                </div>
              )}
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
              disabled={isSubmitting || (!content.trim() && !imageFile)}
              className="relative px-6 py-2 text-white rounded-lg overflow-hidden
                       bg-gradient-to-r from-blue-500 to-purple-500"
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
                initial={{ x: "100%" }}
                animate={isSubmitting === 'completed' ? { x: 0 } : { x: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              
              <motion.div className="relative z-10 flex items-center justify-center gap-2">
                {!isSubmitting && (
                  <motion.span
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    发布
                  </motion.span>
                )}
                
                {isSubmitting && (
                  <motion.svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <path
                      className="opacity-25"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </motion.svg>
                )}
              </motion.div>
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
